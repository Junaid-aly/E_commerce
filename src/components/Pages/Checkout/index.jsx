import React from 'react';
import { useLocation } from 'react-router-dom';

const CheckoutPage = () => {
  const location = useLocation();
  const { products } = location.state || { products: [] };

  // Calculate total count and total price
  const totalCount = products.length;
  const totalPrice = products.reduce((acc, product) => acc + parseFloat(product.price), 0).toFixed(2);

  return (
    <div className="p-4 min-h-screen px-32 text-white">
      <h1 className="text-xl mb-4">Checkout</h1>
      {products.length === 0 ? (
        <p>No items to display</p>
      ) : (
        <div className='flex-grow justify-center bg-slate-800/40 backdrop-blur-md rounded-lg items-center w-full border border-gray p-9'>
          {products.map((product) => (
            <div key={product.id} className="w-full flex justify-between text-white items-center border-b py-2">
              <img src={product.photoURL} alt={product.title} className="w-24 h-24 object-cover rounded-md" />
              <div>
                <h3>{product.title}</h3>
                <p>$ {product.price}</p>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <p className="text-lg">Total Count: {totalCount}</p>
            <p className="text-lg">Total Price: ${totalPrice}</p>
          </div>
          <button className="mt-4 bg-green-500 p-2 rounded text-white">
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
