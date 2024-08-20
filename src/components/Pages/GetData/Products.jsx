import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';

import { getProducts } from "../../../config/usePost";

import { useAuth } from "../../../Context/AuthContext";

import { RiDeleteBack2Fill } from "react-icons/ri";
import toast from 'react-hot-toast';

const ProductsData = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const [authData] = useAuth()
  // console.log(authData)
  // console.log(products,"products")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addItem = (product) => {
    console.log("Adding item:", product);
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
    existingProducts.push(product);
    localStorage.setItem("products", JSON.stringify(existingProducts));
    toast.success(`${product.title} has been added to the cart!`);
  };

  if (loading) {
    return <p>Loading....</p>;
  }


  const DeleteItem = async (productId) => {
    // Show a confirmation dialog
    const confirmed = window.confirm("Are you sure you want to delete this product?");
  
    if (!confirmed) {
     toast.info('Product deletion cancelled.'); 
      return;
    }
  
    try {
      const productDocRef = doc(db, 'Products', productId); 
      await toast.promise(
        deleteDoc(productDocRef), 
        {
          pending: 'Deleting the product...',
          success: 'Product has been deleted!',
          error: 'Failed to delete product.',
        }
      );
      setProducts(products.filter(product => product.id !== productId));
  
    } catch (error) {
      console.error('Error deleting product: ', error);
      alert('Failed to delete product.');
    }
  };
  
  return (
    <div className="w-screen overflow-hidden">
     
    <div className="pt-10 flex flex-wrap align-center justify-center gap-4 sm:gap-8  backdrop-blur-2xl  overflow-hidden pb-16">
      <div className="w-screen bg-indigo-500 backdrop-blur-2xl dark:bg-gray-800/50 dark:text-gray-100 py-3 text-white flex items-center justify-between px-3 lg:px-8 mb-4">
        <p className="text-center flex align-center font-small">
          Our Latest + Products 
        </p>

        <a className="bg-gradient-to-r from-blue-800 to-violet-500 text-white border-gray-400 dark:text-white dark:from-violet-700 dark:to-fuchsia-800 inline-block rounded-md  border-transparent px-5 py-2 text-center font-small hover:bg-indigo-700 shadow-2xl border-0 w-40">
        Explore Products
        </a>

      </div>

      {products &&
        products.map((product) => (
          <a
            key={product.id}
            className="group relative block overflow-hidden bg-gradient-to-r from-violet-100 to-blue-200 text-white rounded-lg dark:text-white  w-96 sm:w-60 md:w-72 lg:w-80 mb-4"
          >
            <button className="absolute end-3 top-3 z-10  font-medium transition hover:scale-105 border-white text-white inline-block rounded-md  border-transparent px-1 text-center hover:bg-red-700">

              {product.userEmail === authData?.email ? <RiDeleteBack2Fill className="text-xl" onClick={() => DeleteItem(product.id)}  /> : ""}
  
</button>

            <img
              src={product?.photoURL}
              alt=""
              className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-60"
            />

            <div className="relative h-64 border border-gray-100 dark:border-gray-900 bg-white dark:bg-gray-800 dark:text-white p-6">
              <div className="flex justify-between align-center">
                <span className="whitespace-nowrap bg-gradient-to-r from-blue-800 to-violet-500 text-white border-black dark:text-white dark:from-violet-700 dark:to-green-600 shadow-xl px-3 py-1.5 text-md font-medium rounded-md">
                  New
                </span>
                <small className="whitespace-nowrap shadow-xl px-3 py-1.5 text-md font-medium rounded-md uppercase text-gray-800 dark:text-white">
                  User: {product?.userName}
                </small>
              </div>
              <div className="flex justify-between align-center">
                <h3 className="mt-3 text-md font-medium text-gray-900 dark:text-gray-200">
                  <i>Title: </i>
                  {product?.title}
                </h3>
                <p className="mt-1.5 text-sm text-gray-700 dark:text-white">
                  Price: ${product?.price}
                </p>
              </div>
              <small className="mt-1.5 text-sm text-gray-700 dark:text-white">
                {product?.description}
              </small>
              <div className="mt-4 flex gap-2">
              <button
                    onClick={() => addItem(product)}
                    className="w-56 p-4 text-sm font-medium transition hover:scale-105 bg-gradient-to-r from-blue-800 to-violet-500 text-white border-gray-400 dark:text-white dark:from-violet-700 dark:to-green-400 inline-block rounded-md border border-transparent px-6 py-2 text-center hover:bg-indigo-700 shadow-2xl "
                  >
                    Add to Cart
                  </button>
                  <button
                    
                    className=" "
                  >
             
                  </button>
                <button
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="w-32 text-sm  transition hover:scale-105 text-white border-gray-500 dark:bg-gray-500 bg-zinc-500 inline-block rounded-md  border-transparent text-center dark:text-white font-medium hover:bg-indigo-600 dark:hover:bg-blue-600 shadow-2xl border-0"
                >
                  Details
                </button>
              </div>
            </div>
          </a>
        ))}
    </div>

  </div>
  );
};

export default ProductsData;
