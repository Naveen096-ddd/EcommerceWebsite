import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 shadow-md text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          {/* <img src="/logo.png" alt="logo" className="w-12 h-12 mr-4" /> */}
          <div className="flex-shrink-0 w-[20ch] overflow-hidden ">
            <div className="text-white font-bold text-3xl typing mt-2">
              Ecommerce
            </div>
          </div>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-lg">
          <Link to="/" className="hover:text-black">Home</Link>
          <Link to="/about" className="hover:text-black">About Us</Link>
          <Link to="/contact" className="hover:text-black">Contact Us</Link>
          <Link to="/categories" className="hover:text-black">Categories</Link>
          <Link to="/shop" className="hover:text-black">Shop</Link>
          <Link to="/blog" className="hover:text-black">Blogs</Link>
        </nav>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-2xl focus:outline-none"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-[#032B44] px-4 pt-2 pb-4 space-y-1">
          <Link to="/" className="block text-white hover:text-black">Home</Link>
          <Link to="/about" className="block text-white hover:text-black">About Us</Link>
          <Link to="/shop" className="block text-white hover:text-black">Shop</Link>
          <Link to="/categories" className="block text-white hover:text-black">Categories</Link>
          <Link to="/contact" className="block text-white hover:text-black">Contact Us</Link>
          <Link to="/blog" className="block text-white hover:text-black">Blog</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
