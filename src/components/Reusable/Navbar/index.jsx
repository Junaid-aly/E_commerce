import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import UserProfileMenu from "../../Pages/UserProfile";
import AddProducts from "../../Pages/AddProducts";
import Logo from "../../../Images/background/Logo.png";
import Sidebar from "../../Pages/SideBar";

function NavbarPage() {
  const [authData] = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleAddProduct = () => {
    if (!authData) {
      // Show an alert if the user is not logged in
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
    } else {
      // Handle AddProduct functionality
    }
  };

  return (
    <nav className="bg-blue-800 text-white shadow shadow-gray-900 w-full px-4 md:px-8">
      <div className="flex items-center justify-between flex-wrap md:flex-nowrap h-18">
        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button className="text-white p-2" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Logo */}
        <div className="text-white text-lg absolute inset-x-0 top-1/2 transform -translate-y-1/2">
          {/* <p>D_C Shoping</p> */}
        </div>

        {/* Mobile Menu Items */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-slate-800/50 shadow-lg z-50">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              {/* Close Menu Button */}
              <button className="text-white p-2" onClick={toggleMenu}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <ul className="flex flex-col space-y-4 p-4 font-semibold">
            <h1 className="bg-blue-800 w-24 p-1 text-white rounded-sm">Dubai_Cloth</h1>
              <li><a href="#" className="hover:text-indigo-400">Dashboard</a></li>
              <li><a href="#" className="hover:text-indigo-400">Search</a></li>
              <li><a href="#" className="hover:text-indigo-400">Explore</a></li>
              <li><a href="#" className="hover:text-indigo-400">About</a></li>
              <li><a href="#" className="hover:text-indigo-400">Contact</a></li>
            </ul>
            {/* Actions in Mobile Menu */}
            <div className="flex flex-row gap-4 h-14 backdrop-blur-3xl">
              <button
                onClick={handleAddProduct}
                className="text-gray-50 rounded-xl flex items-center gap-2"
                >
                <span>
                  <AddProducts />
                </span>
              </button>
              {authData ? (
                <UserProfileMenu />
              ) : (
                <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
                  <Link to="/signup">
                    <span>Register</span>
                  </Link>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Desktop Menu Items and Actions */}
        <div className="hidden md:flex md:flex-grow md:items-center md:justify-between w-full">
          {/* Menu Items for Desktop */}
          <div className="flex justify-between items-center p-4 mx-10 gap-10">
            <div>
              <img className="w-24 object-cover border border-r-slate-300 rounded-md h-10 cursor-pointer" src={Logo} alt="Logo" />
            </div>
            <div>
              <nav className="flex items-center space-x-4 font-bold">
                
                <a href="#" className="hover:text-indigo-400">Dashboard</a>
                <a href="#" className="hover:text-indigo-400">Search</a>
                <a href="#" className="hover:text-indigo-400">Explore</a>
                <a href="#" className="hover:text-indigo-400">About</a>
                <a href="#" className="hover:text-indigo-400">Contact</a>
              </nav>
            </div>
          </div>

          {/* Actions for Desktop */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddProduct}
              className="text-gray-50 rounded-xl flex items-center gap-2"
              >
              <AddProducts />
              <p><Sidebar/></p>
            </button>
            {authData ? (
              <UserProfileMenu />
            ) : (
              <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
                <Link to="/signup">
                  <span>Register</span>
                </Link>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Alert for Non-Logged In Users */}
      {showAlert && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white py-2 px-4 rounded">
          <p>Please log in to add products.</p>
        </div>
      )}
    </nav>
  );
}

export default NavbarPage;
