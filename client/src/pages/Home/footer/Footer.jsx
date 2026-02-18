import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 pt-16 pb-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h2 className="text-3xl font-extrabold text-white mb-4 tracking-wide">
              Furniture Store
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Discover premium furniture designed to bring comfort, luxury, and style into your home.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white transition">Home</a></li>
              <li><a href="#" className="hover:text-white transition">Shop</a></li>
              <li><a href="#" className="hover:text-white transition">About</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
            <p className="text-gray-400">📞 +1 800 123 4567</p>
            <p className="text-gray-400">
              ✉️ <a href="mailto:info@furniture.com" className="hover:text-white">info@furniture.com</a>
            </p>
            <p className="text-gray-400">📍 123 Main St, Anytown, USA</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get updates on new arrivals and exclusive offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-l-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-r-md transition">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Furniture Store. All rights reserved.
          </p>
          <div className="flex space-x-5 mt-4 md:mt-0">
            <a href="https://facebook.com" className="p-2 bg-gray-700 rounded-full hover:bg-blue-600 transition">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" className="p-2 bg-gray-700 rounded-full hover:bg-blue-500 transition">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" className="p-2 bg-gray-700 rounded-full hover:bg-pink-600 transition">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" className="p-2 bg-gray-700 rounded-full hover:bg-blue-700 transition">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
