import React, { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { homeImages } from "../../../assets/Assets";
import { BlogsProvider } from "../../context/BlogContext";
import HomeContent from "./mainhome/HomeContent";
import Items from "./mainhome/Items";
import Cart from "./cart/Cart";
import Footer from "./footer/Footer";
const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % homeImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
     <BlogsProvider>
    <div>
      <section className="text-gray-100 body-font bg-cover bg-center">
        <div className="relative w-full h-screen overflow-hidden ">
            <iframe
            className="absolute w-full h-full object-cover bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-500 curser-pointer"
            src="https://www.youtube.com/embed/S-A0qLTxf-U?autoplay=1&mute=1&loop=1&playlist=S-A0qLTxf-U"
            title="YouTube video"
            allow="autoplay; fullscreen"
          ></iframe>
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 animate-fadeIn">
                Transform Your Space
              </h1>
              <p className="text-white text-lg md:text-2xl animate-fadeIn delay-500">
                Stylish, functional, and perfect for modern living
              </p>
          </div>
        </div>
        <div className="bg-black bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-500">
          <div className="container px-5 py-12 mx-auto flex flex-wrap">
            <span className="hidden md:block absolute top-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-white animate-fadeInScale text-3xl">
              Explore Our Modern Furniture Collections
            </span>
            <div className="flex justify-center items-center lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden rounded-2xl relative">
                <img
                    alt="feature"
                    className="object-cover object-center h-600 w-full transition duration-700 rounded-2xl ease-in-out"
                    src={homeImages[currentIndex]}
                />
                 <div className="absolute bottom-4 justify-center flex items-center space-x-4">
                    <AvatarGroup
                        max={4}
                        sx={{ '& .MuiAvatar-root': { width: 40, height: 40 } }}
                    >
                        <Avatar alt="Remy Sharp" src="" />
                        <Avatar alt="Travis Howard" src="" />
                        <Avatar alt="Agnes Walker" src="" />
                        <Avatar alt="Trevor Henderson" src="" />
                    </AvatarGroup>
                    <div className="flex items-center text-gray-100 bg-black bg-opacity-50 px-3 py-1 rounded-full">
                        <FavoriteIcon className="text-red-500 mr-1" />
                        <span>4.2k Ratings</span>
                    </div>
            </div>
          </div>
            <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center ">
              <div className="flex flex-col mb-10 lg:items-start items-center">
                <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 mb-5">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <div className="flex-grow">
                  <h2 className="text-white text-lg title-font font-medium mb-3">
                    Premium Wooden Furniture
                  </h2>
                  <p className="leading-relaxed text-base text-gray-300">
                    Handcrafted wooden masterpieces that enhance your living space with natural elegance and durability.
                  </p>
                  <a className="mt-3 text-yellow-300 inline-flex items-center cursor-pointer">
                    Explore More
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="flex flex-col mb-10 lg:items-start items-center">
                <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 mb-5">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                    <circle cx="6" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                  </svg>
                </div>
                <div className="flex-grow">
                  <h2 className="text-white text-lg title-font font-medium mb-3">
                    Modern Sofa Collection
                  </h2>
                  <p className="leading-relaxed text-base text-gray-300">
                    Experience unmatched comfort and style with our premium modern sofa sets designed for luxury living.
                  </p>
                  <a className="mt-3 text-yellow-300 inline-flex items-center cursor-pointer">
                    Explore More
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="flex flex-col mb-10 lg:items-start items-center">
                <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 mb-5">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="flex-grow">
                  <h2 className="text-white text-lg title-font font-medium mb-3">
                    Interior Styling Solutions
                  </h2>
                  <p className="leading-relaxed text-base text-gray-300">
                    Transform your home with expert-designed interior setups, matching furniture, and creative layouts.
                  </p>
                  <a className="mt-3 text-yellow-300 inline-flex items-center cursor-pointer">
                    Explore More
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
    <HomeContent/>
    {/* <Items/> */}
    {/* <Cart/> */}
    </BlogsProvider>
    <Footer/>
    </>
  );
};
export default Home;
