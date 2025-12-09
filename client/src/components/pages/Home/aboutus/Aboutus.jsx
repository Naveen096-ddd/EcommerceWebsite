import React from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
const Aboutus = () => {
  return (
    <>
    <Header/>
    <div className="px-5 py-20 bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-500">
      <h1 className="text-4xl font-bold text-center mb-12">
        About Us
      </h1>
      <div className="flex flex-col space-y-6 items-center">
        <p className="text-xl text-center text-gray-800 max-w-2xl">
          Welcome to our furniture website, where we provide high-quality, stylish and affordable furniture for your home or office. Our mission is to provide our customers with the best shopping experience possible, with a wide range of products, competitive prices and exceptional customer service.
        </p>
        <p className="text-xl text-center text-gray-800 max-w-2xl">
          Our team consists of experienced professionals who are passionate about furniture and committed to providing the best possible service to our customers. We strive to build long-term relationships with our customers, and we are dedicated to helping you find the perfect piece of furniture for your needs.
        </p>
        <p className="text-xl text-center text-gray-800 max-w-2xl">
          We take pride in the quality of our products, and we only source from reputable suppliers who share our commitment to excellence. We are constantly updating our product range to ensure that we have the latest and greatest furniture available to our customers.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
         About Us
        </button>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Aboutus;