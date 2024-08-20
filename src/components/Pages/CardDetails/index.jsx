import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
    className="min-h-screen flex items-center justify-center px-4 sm:px-8"
    style={{
      backgroundImage: `url(${MyLogo})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    <div className="flex flex-col md:flex-row justify-center w-full max-w-7xl bg-slate-900/50 backdrop-blur-md rounded-lg overflow-hidden shadow-lg">
      {/* Image Section */}
      <div className="md:w-1/2">
        <img 
          src={product.photoURL} 
          alt={product.photoURL} 
          className="w-full h-auto md:h-full object-cover"
        />
      </div>

      {/* Details Section */}
      <div className="text-white flex flex-col justify-center gap-4 py-6 px-4 md:px-8">
        <h2 className="text-xl md:text-3xl font-semibold">{product.title}</h2>
        <p className="text-sm md:text-lg">Brand: {product.brand}</p>
        <p className="text-sm md:text-lg">{product.description}</p>
        <p className="text-sm md:text-lg">Category: {product.category}</p>
        <p className="text-sm md:text-lg font-bold">Price: ${product.price}</p>
        <div>
          <button className="bg-blue-600 text-white py-2 px-4 md:px-8 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Add to Cart
          </button>
          
          <Link to={`/`}>
            <button className="bg-green-600 m-4 text-white py-2 px-4 md:px-8 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
              Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ProductDetails;
