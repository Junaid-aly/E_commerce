import React from 'react';

const ProductsSearchs = ({ title, description, photoURL, price,userName }) => {
  return (
<div className="flex flex-wrap gap-7 p-3">
  <div
    className="group relative block overflow-hidden bg-gradient-to-r from-violet-100 to-blue-200 text-white rounded-lg dark:text-white sm:w-60 sm:bg-red-900 md:w-60 lg:w-64 xl:w-72 mb-4"
  >
    <img
      src={photoURL}
      alt=""
      className="h-full w-full object-cover transition duration-500 group-hover:scale-105 sm:h-48 md:h-56 lg:h-64 xl:h-72"
    />

    <div className="relative   bg-gradient-to-tr to-teal-800 from-indigo-800 backdrop-blur-lg p-6">
      <div className="flex justify-between items-center">
        <span className="whitespace-nowrap bg-gradient-to-r from-blue-800 to-violet-500 text-white border-black dark:text-white dark:from-violet-700 dark:to-green-600 shadow-xl px-3 py-1.5 text-md font-medium rounded-md">
          New
        </span>
        <small className="whitespace-nowrap shadow-xl px-3 py-1.5 text-md font-medium rounded-md uppercase text-gray-800 dark:text-white">
          User: {userName}
        </small>
      </div>
      <div className="flex justify-between items-center mt-3">
        <h3 className="text-md font-medium text-gray-900 dark:text-gray-200">
          <i>Title: </i>
          {title}
        </h3>
        <p className="text-sm text-gray-700 dark:text-white">
          Price: ${price}
        </p>
      </div>
      <small className="mt-1.5 text-sm text-gray-700 dark:text-white">
        {description}
      </small>
    </div>
  </div>
</div>

  );
};

export default ProductsSearchs;
