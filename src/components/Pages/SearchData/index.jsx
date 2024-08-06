import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProducts } from "../../../config/usePost";
import ProductsSearchs from "./ProductsSearch";

const SearchProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // Add search state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        setFilteredProducts(productsData); // Initialize filtered products
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on search query
    if (search.trim() !== "") {
      const results = products.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts(products); // Reset to all products if search is empty
    }
  }, [search, products]); // Depend on search and products

  if (loading) {
    return <p>Loading....</p>;
  }

  return (
    <div className="w-full">
      
        {/* Search Input */}
        <div className="mb-4  ">
          <input
            className="w-96 h-10 rounded-lg p-2 border text-black  "
            type="text"
            value={search}
            placeholder="Search Products"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {search.trim() === "" ? (
          ""
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductsSearchs
              key={product.id} // Add a unique key prop
              title={product.title}
              price={product.price}
              userName={product.userName}
              photoURL={product.photoURL}
              description={product.description}
            />
          ))
        ) : (
        <p className="text-white">Not Product find</p>
        )}
     
    </div>
  );
};

export default SearchProduct;
