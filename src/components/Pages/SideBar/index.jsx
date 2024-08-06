import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  
  const navigate = useNavigate()
  // Toggle the sidebar open/close state
  const toggleSidebar = () => {
    setIsOpen(prevState => !prevState);
  };

  // Get products from localStorage
  const getItems = () => {
    const productsString = localStorage.getItem("products");
    return JSON.parse(productsString) || [];
  };

  // Fetch products initially
  useEffect(() => {
    const fetchedProducts = getItems();
    setProducts(fetchedProducts);
  }, []);

  // Remove a single product by ID
  const removeProduct = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const itemCount = products.length;

  const handleCheckout = () => {
    navigate('/checkout', { state: { products } });
  };

  return (
    <div className="flex">
      <div className={`flex-1 p-2 transition-margin duration-300 ${isOpen ? 'mr-12' : 'mr-2 '}`}>
        <button onClick={toggleSidebar} className="">
          <i className="uil uil-shopping-cart text-2xl"></i>
          <span className="ml-2 text-sm">{itemCount}</span> {/* Display item count */}
        </button>
      </div>

      <div
        className={`fixed top-0 z-50 right-0 min-h-screen bg-gray-800/40 backdrop-blur-lg text-white transition-transform transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } w-96 flex flex-col`}
      >
        <button onClick={toggleSidebar} className="absolute top-4 right-4 text-white">
          <i className="uil uil-times text-2xl border border-white"></i>
        </button>
        
        {/* Sidebar Content */}
        <div className="p-4 space-y-4 mt-10">
          {products.length === 0 ? (
            <p className="text-center text-gray-300">No items to display</p>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="flex justify-around items-center border border-r-emerald-300 sm:flex-row gap-4"
              >
                <div className="flex-shrink-0 w-full sm:w-1/3">
                  <img
                    src={product?.photoURL}
                    alt={product?.title}
                    className="w-full h-28 object-cover rounded-md"
                  />
                </div>
                <div>
                  <h3 className="text-sm">
                    <i>Title: </i>{product?.title}
                  </h3>
                  <small className="text-sm">
                    Brand: {product?.brand}
                  </small>
                </div>
                <div>
                  <p className="text-sm">
                    Price: {product?.price}
                  </p>
                  <button onClick={() => removeProduct(product.id)} className='bg-indigo-700 p-2 rounded-md m-3'>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4">
          <button onClick={handleCheckout} className='w-full bg-red-600 p-3 rounded-md text-white'>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
