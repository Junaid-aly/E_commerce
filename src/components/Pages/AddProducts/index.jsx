import React, { useState } from 'react';
import { Addproducts } from '../../../config/usePost';
import { useAuth } from '../../../Context/AuthContext';

const AddProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authData] = useAuth();
  const [error, setError] = useState(null);

  const {
    title,
    setTitle,
    brand,
    setBrand,
    category,
    setCategory,
    description,
    setDescription,
    photo,
    setPhoto,
    price,
    setPrice,
    addPost,
    handleFileChange,
  } = Addproducts();

  const [remainingChars, setRemainingChars] = useState(90);


  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleFileInputChange = (e) => {
    if (e.target.files || e.target.files.length > 0) {
      const file = e.target.files[0];
      setPhoto(file);
      handleFileChange(file);
    } else {
      // Handle case where no file is selected or files is undefined
      setPhoto(null);
      handleFileChange(null);
    }
  };

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    setRemainingChars(90 - newDescription.length);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPost();
      setIsModalOpen(false);
      // Reset form
      setTitle('');
      setBrand('');
      setPrice('');
      setCategory('');
      setDescription('');
      setPhoto(null);
      window.location.reload();
    } catch (err) {
      setError('Failed to add product. Please try again.');
    }
  };



  return (
    <div>
      {/* Modal toggle */}
      <div className="flex justify-center">
        <button
          onClick={toggleModal}
          className="block border bg-blue-800 text-white bg-primary-700 cursor-pointer hover:bg-primary-800  font-medium rounded-lg text-sm px-3 py-2.5 text-center"
          type="button"
        >
          Create_Product
        </button>
      </div>

      {/* Main modal */}
      <div
        id="defaultModal"
        tabIndex={-1}
        aria-hidden="true"
        className={`fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full ${isModalOpen ? 'flex' : 'hidden'} justify-center items-center`}
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          {/* Modal content */}
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* Modal header */}
            <div className="flex justify-between  pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add Product
              </h3>
              <button
                onClick={toggleModal}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 text-left sm:grid-cols-2">
                {/* Form fields */}
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    required
                    id="title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoComplete="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="brand"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Product brand"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="$2999"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                   required
                    id="category"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="" disabled>Select category</option>
                    <option value="TV">TV/Monitors</option>
                    <option value="PC">PC</option>
                    <option value="Gaming">Gaming/Console</option>
                    <option value="Phones">Phones</option>
                    <option value="Vehicle">Vehicle/Bikes</option>
                    <option value="A/W">Accessories/Watches</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="photo"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Photo
                  </label>
                  <input
  required
  type="file"
  id="photo"
  name="photo"
  accept="image/*"
  onChange={handleFileInputChange}
  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
/>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    required
                    id="description"
                    value={description}
                    maxLength={90}
                    onChange={handleDescriptionChange}
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Write product description here"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {remainingChars} characters remaining
                  </p>
                </div>
              </div>
              {error && (
                <div className="mb-4 text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="bg-red-800 text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Add product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
