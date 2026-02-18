import React from "react";
import { shopImages } from "../../../assets/Assets";
import Header from "../header/Header";
import Footer from "../footer/Footer";
const Shop = () => {
  return (
    <>
    <Header/>
    <div className="w-full mx-auto px-5 py-24 bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-500">
      <h1 className="text-4xl font-bold text-center mb-12">
        Shop Our Furniture Collections
      </h1>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {shopImages.map((item) => (
          <div key={item.title} className="bg-white p-6 rounded-lg shadow-lg">
            <img
              src={item.image1}
              alt={item.title}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <h2 className="text-2xl font-bold mt-4">{item.title}</h2>
            <p className="text-gray-500 mt-2">{item.content1}</p>
            <a className="mt-3 text-yellow-300 inline-flex items-center cursor-pointer">Explore More
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
            </a>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Shop;

