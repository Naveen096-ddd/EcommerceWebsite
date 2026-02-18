import { useState } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Home from "../pages/Home/Home";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="h-20 fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0f172a] via-[#0b5ed7] to-[#0dcaf0] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="hidden md:flex items-center gap-10">
              <div className="text-white font-bold text-3xl tracking-wide">
                Ecommerce
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-white text-lg hover:text-cyan-300 transition ">Home</Link>
              <Link to="/about" className="text-white text-lg hover:text-cyan-300 transition ">About</Link>
              <Link to="/shop" className="text-white text-lg hover:text-cyan-300 transition ">Shop</Link>
              <Link to="/categories" className="text-white text-lg hover:text-cyan-300 transition ">Categories</Link>
              <Link to="/contact" className="text-white text-lg hover:text-cyan-300 transition ">Contact Us</Link>
              <Link to="/blog" className="text-white text-lg hover:text-cyan-300 transition ">Blog</Link>
              <FaSearch className="text-white text-xl cursor-pointer hover:text-cyan-300 transition" />
              <FaShoppingCart className="text-yellow-300 text-xl hover:text-yellow-400 cursor-pointer transition" />
              <Link to="/signup" className="px-3 py-1.5 rounded-md text-sm font-semibold text-white bg-pink-600 hover:bg-pink-700 transition">Signup</Link>
              <Link to="/login" className="px-3 py-1.5 rounded-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition">Login</Link> 
            </div>
            <div className="flex md:hidden items-center justify-between w-full">
              <div className="text-white font-bold text-2xl tracking-wide">
                Ecommerce
              </div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white text-2xl"
              >
                {isOpen ? "✖" : "☰"}
              </button>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden bg-[#0b5ed7] px-4 py-3 space-y-2">
            <Link to="/" className="block text-white">Home</Link>
            <Link to="/about" className="block text-white">About</Link>
            <Link to="/shop" className="block text-white">Shop</Link>
            <Link to="/categories" className="block text-white">Categories</Link>
            <Link to="/contact" className="block text-white">Contact</Link>
            <Link to="/blog" className="block text-white">Blog</Link>
            <div className="flex items-center gap-3 mt-2">
              <FaSearch className="text-white text-lg" />
              <FaShoppingCart className="text-yellow-300 text-lg" />
              <Link to="/login" className="px-3 py-1.5 rounded-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition">Login</Link> 
              <Link to="/signup" className="px-3 py-1.5 rounded-md text-sm font-semibold text-white bg-pink-600 hover:bg-pink-700 transition">Signup</Link>
            </div>
          </div>
        )}
      </nav>

      <div className="pt-20">
        <Home />
      </div>
    </>
  );
};

export default Navbar;
