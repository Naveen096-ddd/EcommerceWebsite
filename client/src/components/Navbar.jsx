import { useState } from "react";
import { FaSearch, FaHeart, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import Blog from "../components/pages/Home/blog/Blog";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="h-20  fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
          <div className="flex justify-between h-16 ">
            <div className="flex-shrink-0 flex items-center text-white font-bold text-3xl">
              Ecommerce
            </div>
            <div className="hidden md:flex md:space-x-8 items-center text-2xl">
              <Link to="/"className="block text-white hover:text-black">Home</Link>
              <Link to="/about"className="block text-white hover:text-black">About Us</Link>
              <Link to="/shop"className="block text-white hover:text-black">Shop</Link>
              <Link to="/categories"className="block text-white hover:text-black">Categories</Link>
              <Link to="/contact"className="block text-white hover:text-black">Contact Us</Link>
              <Link to="/blog"className="block text-white hover:text-black">Blog</Link>
            </div>
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white focus:outline-none"
              >
                {isOpen ? "✖" : "☰"}
              </button>
            </div>
            <div className="hidden flex items-center md:flex md:space-x-4 text-2xl cursor-pointer">
              <FaSearch className="text-white hover:text-black" />
              <FaHeart className="text-pink-500" />
              <FaShoppingCart className="text-yellow-300 hover:text-Yellow-500" />
             <Link to="/signup"> <FaUserCircle className="text-white hover:text-black" /></Link>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-[#032B44]">
              <Link to="/"className="block text-white hover:text-black">Home</Link>
              <Link to="/about"className="block text-white hover:text-black">About Us</Link>
              <Link to="/shop"className="block text-white hover:text-black">Shop</Link>
              <Link to="/categories"className="block text-white hover:text-black">Categories</Link>
              <Link to="/contact"className="block text-white hover:text-black">Contact Us</Link>
              <Link to="/blog"className="block text-white hover:text-black">Blog</Link>
            <div className="flex items-center md:flex md:space-x-4 mt-2 cursor-pointer">
              <FaSearch className="text-white" />
              <FaHeart className="text-white" />
              <FaShoppingCart className="text-white" />
              <FaUserCircle className="text-white" />
            </div>
          </div>
        )}
      </nav>
      <Home/>
    </>
  );
}

export default Navbar;
