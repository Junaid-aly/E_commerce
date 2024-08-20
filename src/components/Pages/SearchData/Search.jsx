import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../../config/usePost";

const SearchModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (search.trim() !== "") {
      const results = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts(products);
    }
  }, [search, products]);

  if (loading) {
    return <p>Loading....</p>;
  }

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div  >
    

      <button
        className=" rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 "
        onClick={openModal}
      >
        Search
      </button>

      {isOpen && (
        <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md mx-4 p-6 rounded-lg shadow-lg relative mt-40">
            <button
              className="absolute top-2 right-2  text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              &#x2715;
            </button>
            <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg py-2 px-4 "
      />
            <div className="mt-4">
              <p className="text-gray-700">Search Results for: "{search}"</p>
              <ul className="mt-2">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <li
                      key={product.id}
                      className="border-b py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <p className="font-medium">{product.title}</p>
                    </li>
                  ))
                ) : (
                  <p>No products found.</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchModal;
