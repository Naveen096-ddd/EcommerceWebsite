
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useBlogs } from "../../../components/context/BlogContext";
import { products } from "../../../assets/Assets";
import Items from "../mainhome/Items";

//Our Furniture Collection
const FurnceCollectionSection = () => (
    <section className="bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-500 py-24">
        <div className="container px-5  mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs sm:text-3xl text-2xl font-bold title-font mb-4 text-gray-900 title-font mb-1">
                FURNITURE COLLECTION
            </h2>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Discover stylish and comfortable furniture for every corner of your home. From living room essentials to bedroom must-haves, we bring you modern designs crafted for your lifestyle.
            </p>
            </div>
            <div className="flex flex-wrap">
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
                <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                Elegant Sofa Sets
                </h2>
                <p className="leading-relaxed text-base mb-4">
                Comfortable and stylish sofas perfect for modern living rooms. Available in multiple colors and fabrics.
                </p>
                <a className="text-green-800 inline-flex items-center cursor-pointer">
                Learn More
                <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
                </a>
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
                <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                Dining Tables
                </h2>
                <p className="leading-relaxed text-base mb-4">
                Modern and rustic dining tables to suit your space. Durable wood and sleek designs for every home.
                </p>
                <a className="text-green-800 inline-flex items-center cursor-pointer">
                Learn More
                <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
                </a>
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
                <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                Stylish Chairs
                </h2>
                <p className="leading-relaxed text-base mb-4">
                Ergonomic and trendy chairs for dining, workspaces, or living areas. Comfort meets design.
                </p>
                <a className="text-green-800 inline-flex items-center cursor-pointer">
                Learn More
                <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
                </a>
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
                <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                Bedroom Essentials
                </h2>
                <p className="leading-relaxed text-base mb-4">
                Beds, nightstands, and wardrobes crafted to provide both style and functionality for your bedroom.
                </p>
                <a className="text-green-800 inline-flex items-center cursor-pointer">
                Learn More
                <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
                </a>
            </div>
            </div>
            <button className="flex mx-auto mt-16 font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 border-0 py-3 px-10 rounded-lg text-lg shadow-md transition transform hover:scale-105 hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-4 focus:ring-indigo-300">
            Shop Now
            </button>
        </div>
    </section>
)
//Categories File
const CategoriesSection = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  return (
    <section className="bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-500">
      <div className="container mx-auto px-2">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 flex items-center justify-center">
          Popular Categories
        </h1>
        <div className="flex flex-wrap -m-4">
{categories.map((category, index) => (
  <div
    key={category.id || `${category.names}-${index}`}
    className="p-4 w-1/2 sm:w-1/3 md:w-1/6"
  >
    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden bg-white shadow-lg flex flex-col">
      <div className="relative w-full h-50 cursor-pointer">
        <img
          className="w-full h-full object-cover"
          src={category.image}
          alt={category.names}
        />
        <button
          onClick={() => setSelectedCategory(category)}
          className="absolute top-0 right-0 bg-green-600 text-white text-xs px-2 py-1 rounded hover:bg-green-700 hidden md:inline-block"
        >
          View
        </button>
      </div>
      <div className="p-2 flex-1 flex items-center justify-center">
        <h3 className="text-center text-sm font-medium text-gray-900">
          {category.names}
        </h3>
      </div>
    </div>
  </div>
))}

        </div>
        {selectedCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-11/12 md:w-2/5 p-6 relative">
              <button
                onClick={() => setSelectedCategory(null)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg font-bold"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4">{selectedCategory.names}</h2>
              <img
                src={selectedCategory.image}
                alt={selectedCategory.names}
                className="w-full h-64 object-cover mb-4 rounded"
              />
              <p className="text-gray-700 mb-2">
                {selectedCategory.description || "No description available."}
              </p>
              <p className="text-gray-900 font-semibold mb-1">
                Price: ${selectedCategory.price}
              </p>
              <p className="text-yellow-500 font-medium">
                Rating: {selectedCategory.rating} ⭐
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
//Dummy Our New Collection file
const ProductCard = ({ brand, name, image, price, rating, reviews }) => (
  <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
    <img src={image} alt={name} className="w-full h-64 object-cover object-center" />
    <div className="p-4">
      <h2 className="text-sm text-gray-500">{brand}</h2>
      <h1 className="text-lg font-medium text-gray-900">{name}</h1>
      <div className="flex items-center mt-2 mb-2">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            fill={i < rating ? "currentColor" : "none"}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 text-indigo-500"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg>
        ))}
        <span className="text-gray-600 ml-2">{reviews} Reviews</span>
      </div>
      <p className="text-xl font-semibold">₹{price}.00</p>
      <div className="mt-2 flex gap-2">
          <button className="flex-1 bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition">
            Add to Cart
          </button>
          {/* <button className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition" >
            Buy
          </button> */}
        </div>
    </div>
  </div>
);
const FurnitureGrid = () => {
  return (
    <div className="bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-500 mx-auto py-12 px-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Our New  Collection</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};
//Discover the Latest in Furniture file
const BlogsSection = ({ blogs, openComments }) => (
  <section className=" bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-500 py-24">
    <div className="container mx-auto px-5">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center mb-9">Discover the Latest in Furniture & Home Decor</h1>
      <div className="flex flex-wrap -m-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="p-4 w-full sm:w-1/2 md:w-1/4">
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden bg-white shadow-lg">
              <img
                className="lg:h-48 md:h-36 w-full object-cover object-center"
                src={blog.img}
                alt={blog.title}
              />
              <div className="p-6">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  {blog.category}
                </h2>
                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                  {blog.title}
                </h1>
                <p className="leading-relaxed mb-3">{blog.description}</p>
                <div className="flex items-center flex-wrap">
                  <a className="text-indigo-500 inline-flex items-center cursor-pointer">
                    Learn More
                  </a>
                  <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                    {blog.likes}
                  </span>
                  <span
                    onClick={() => openComments(blog.id)}
                    className="text-gray-400 inline-flex items-center leading-none text-sm cursor-pointer hover:text-indigo-500"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M18 10c0 3.866-3.582 7-8 7a8.964 8.964 0 01-4-.9L2 17l1.9-4a8.964 8.964 0 01-.9-4c0-3.866 3.582-7 8-7s8 3.134 8 7z" />
                    </svg>
                    {blog.comments}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
//FurnitureFeatures Content
const FurnitureFeaturesContent = () => {
  return (
    <section className="text-gray-700 body-font bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-500">
      <div className="container px-5 py-24 mx-auto">
        <div className="text-center mb-20">
          <h1 className="sm:text-4xl text-3xl font-semibold title-font text-gray-900 mb-4 tracking-wide">
            Crafted Elegance for Your Home
          </h1>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-600">
            Discover premium furniture designed with precision, warmth, and timeless charm.
            Every piece is crafted to elevate your home into a sanctuary of comfort and style.
          </p>

          <div className="flex mt-6 justify-center">
            <div className="w-20 h-1 rounded-full bg-amber-600"></div>
          </div>
        </div>
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
          <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-amber-100 text-amber-600 mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M18 20v-6M6 20v-6M3 10h18M7 10V5a5 5 0 0110 0v5" />
              </svg>
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 text-lg font-medium mb-3">Handcrafted Luxury</h2>
              <p className="leading-relaxed text-base">
                Every piece is hand-crafted by skilled artisans using fine hardwoods,
                ensuring durability and a luxurious finish that ages beautifully.
              </p>
            </div>
          </div>
          <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-amber-100 text-amber-600 mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M4 12h16M2 15v-3a3 3 0 013-3h14a3 3 0 013 3v3M2 15h2v3h16v-3h2" />
              </svg>
            </div>

            <div className="flex-grow">
              <h2 className="text-gray-900 text-lg font-medium mb-3">
                Modern Comfort
              </h2>
              <p className="leading-relaxed text-base">
                Experience unmatched comfort with plush upholstery and ergonomic
                designs perfect for cozy evenings and elegant gatherings.
              </p>
            </div>
          </div>
          <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-amber-100 text-amber-600 mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 2l7 10H5l7-10zM6 14h12v3H6v-3zM10 17v3h4v-3" />
              </svg>
            </div>

            <div className="flex-grow">
              <h2 className="text-gray-900 text-lg font-medium mb-3">
                Timeless Aesthetic
              </h2>
              <p className="leading-relaxed text-base">
                Our designs blend modern minimalism with classic elegance,
                giving your home a warm, rich, and timeless personality.
              </p>
            </div>
          </div>
        </div>
        <button className="flex mx-auto mt-16 text-white bg-amber-600 border-0 py-3 px-10
          focus:outline-none hover:bg-amber-700 rounded-lg shadow-lg text-lg transition">
          Explore Collection
        </button>
      </div>
    </section>
  );
};
//Contact Section
const ContactSection = () => (
  <>
    <section className="relative min-h-screen bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-500 flex justify-center items-center px-4 py-12">
      <h1 className="absolute top-0 left-1/2 -translate-x-1/2 text-4xl md:text-4xl font-bold text-black z-20">Contact Us</h1>
      <div className="absolute inset-0">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="map"
          scrolling="no"
          src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=India&ie=UTF8&t=&z=5&iwloc=B&output=embed"
          className="filter grayscale contrast-125 opacity-40"
        ></iframe>
      </div>
      <div className="container px-5 py-15 mx-auto flex">
        <div className="lg:w-1/3 md:w-1/2 bg-white rounded-xl p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-lg">
          <h2 className="text-gray-900 text-2xl mb-2 font-semibold title-font">Get in Touch</h2>
          <p className="leading-relaxed mb-6 text-gray-600">
            Have a question about our furniture? Send us a message and we'll get back to you promptly.
          </p>

          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <div className="relative mb-4">
            <label htmlFor="message" className="leading-7 text-sm text-gray-600">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 h-32 text-base outline-none text-gray-700 py-2 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>

          <button className="text-white bg-green-600 border-0 py-3 px-6 focus:outline-none hover:bg-green-700 rounded-lg text-lg transition">
            Send Message
          </button>

          <p className="text-xs text-gray-500 mt-3">
            We value your feedback and inquiries. Visit our showroom for a firsthand experience of our furniture collection.
          </p>
        </div>
      </div>
    </section>
  </>
);
const HomeContent = () => {
  const { blogs, categories, activeBlog, openComments, closeComments } = useBlogs();
  return (
    <div>
      <FurnceCollectionSection/>
      <CategoriesSection categories={categories} />
      {/* <FurnatureItems/> */}
      <Items/>
      <FurnitureGrid />
      <BlogsSection blogs={blogs} openComments={openComments} />
      {activeBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg relative">
            <h2 className="text-xl font-bold mb-4">Comments</h2>
            <textarea
              className="w-full border border-gray-300 rounded p-2 mb-4"
              rows="5"
              placeholder="Write a comment..."
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={closeComments}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded mr-2"
              >
                Close
              </button>
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-4 rounded">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      <FurnitureFeaturesContent/>
      <ContactSection/>

    </div>
  );
};

export default HomeContent;
