import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase'; 
import MyLogo from "../../../Images/background/Wave.svg";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const getProduct = async () => {
      try {
        const docRef = doc(db, 'Products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          setError('No such document!');
        }
      } catch (error) {
        console.error("Error fetching product: ", error);
        setError('Failed to fetch product.');
      }
    };

    getProduct();
  }, [id]);

  if (error) {
    return <p className="text-red-500 text-center text-lg">Error: {error}</p>;
  }

  if (!product) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 "
      style={{
        backgroundImage: `url(${MyLogo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="shadow-lg rounded-lg max-w-7xl w-full p-6 bg-indigo-900/30 backdrop-blur-lg space-y-6 lg:flex lg:space-x-6">
        {/* Details Section */}
        <div className="">
          <img 
            src={product.photoURL} 
            alt={product.photoURL} 
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
        <div className="lg:w-1/2 space-y-4 py-10">
          <h2 className="text-2xl font-extrabold text-white">{product.title}</h2>
          <p  className="text-1xl font-semibold text-white">Brand: {product.brand}</p>
          <p className="text-white text-lg">{product.description}</p>
          <p  className="text-1xl font-semibold text-white">Category: {product.category}</p>
          <p className="text-1xl font-semibold text-white">Price: ${product.price}</p>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Add to Cart
          </button>
        </div>
        {/* Image Section */}
        
      </div>
    </div>
  );
};

export default ProductDetails;
