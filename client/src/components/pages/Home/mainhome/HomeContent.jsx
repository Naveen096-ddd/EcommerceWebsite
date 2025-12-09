
import React from "react";
import { useBlogs } from "../../../context/BlogContext";
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
import { useState, useEffect, useRef } from "react";
import { furnitureProducts } from "../../../../assets/Assets";
import { FaSearch, FaHeart, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
const FurnatureItems =()=>{
  const [cartCount, setCartCount] = useState(0);
  const [quantities, setQuantities] = useState(
    furnitureProducts.reduce((acc, p) => {
      acc[p.id] = 0;
      return acc;
    }, {})
  );
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const useAutoScroll = (scrollRef, isHovered) => {
    useEffect(() => {
      const scrollContainer = scrollRef.current;
      let scrollAmount = 0;
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      const interval = setInterval(() => {
        if (!isHovered) {
          scrollAmount += 1;
          if (scrollAmount > maxScroll) scrollAmount = 0;
          scrollContainer.scrollLeft = scrollAmount;
        }
      }, 30);
      return () => clearInterval(interval);
    }, [isHovered]);
  };
  useAutoScroll(scrollRef1, isHovered1);
  useAutoScroll(scrollRef2, isHovered2);
  const increment = (id) => setQuantities({ ...quantities, [id]: quantities[id] + 1 });
  const decrement = (id) => quantities[id] > 0 && setQuantities({ ...quantities, [id]: quantities[id] - 1 });
  const addToCart = (id) => {
    setCartCount(cartCount + quantities[id]);
    setQuantities({ ...quantities, [id]: 0 });
    setIsOpen(true);
  };
  const renderProductCard = (product) => (
    <div key={product.id} className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md p-4 transition-transform hover:scale-105 curser-pointer">
      <img className="h-40 w-full object-cover rounded mb-4" src={product.image} alt={product.name} />
      <h2 className="text-gray-900 font-medium text-lg mb-1">{product.name}</h2>
      <p className="text-gray-500 text-sm mb-2">{product.description}</p>
      <div className="flex justify-between mb-2">
        <span className="text-gray-500 text-sm">Color: {product.color}</span>
        <span className="text-gray-900 text-sm">Size: {product.size}</span>
      </div>
      <div className="flex items-center mb-4">
        <button className="px-2 py-1 bg-gray-200 rounded text-gray-700" onClick={() => decrement(product.id)}>-</button>
        <span className="mx-2">{quantities[product.id]}</span>
        <button className="px-2 py-1 bg-gray-200 rounded text-gray-700" onClick={() => increment(product.id)}>+</button>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-900 font-bold text-lg">₹{product.price}</span>
        <button className="bg-indigo-500 text-white px-4 py-2 rounded" onClick={() => addToCart(product.id)}>
          <FaShoppingCart className="mr-2" />
        </button>
      </div>
    </div>
  );
return (
    <div className=" bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-500 mx-auto px-12 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 flex items-center justify-center">Best Sellers</h1>
        {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={() => setIsOpen(false)} >
                <div className="bg-white p-8 rounded-lg max-w-md mx-auto relative" onClick={(e) => e.stopPropagation()} >
                    <button className="absolute top-2 right-2 text-gray-500 text-xl font-bold hover:text-gray-800" onClick={() => setIsOpen(false)}> ×</button>
                    <h2 className="text-gray-900 font-bold text-lg text-center">
                        Please create an account to proceed....
                    </h2>
                    <div className="flex items-center justify-center mt-8">
                        <Link to="/signup">
                        <button className="bg-indigo-500 text-white px-4 py-2 rounded" onClick={() => setIsOpen(false)} >Sign Up</button>
                        </Link>
                    </div>
                </div>
            </div>
            )}
            <div ref={scrollRef1} className="flex space-x-6 overflow-x-hidden pb-4" onMouseEnter={() => setIsHovered1(true)} onMouseLeave={() => setIsHovered1(false)}>
                {furnitureProducts.slice(0, 10).map(renderProductCard)}
            </div>
            <div ref={scrollRef2} className="flex space-x-6 overflow-x-hidden pb-4 mt-10" onMouseEnter={() => setIsHovered2(true)} onMouseLeave={() => setIsHovered2(false)} >
                {furnitureProducts.slice(10, 20).map(renderProductCard)}
            </div>
    </div>
  );
}
const CategoriesSection = ({ categories }) => (
  <section className=" bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-500">
    <div className="container mx-auto px-2">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 flex items-center justify-center">Popular Categories</h1>
      <div className="flex flex-wrap -m-4">
        {categories.map((category) => (
          <div key={category.id} className="p-4 w-1/2 sm:w-1/3 md:w-1/6">
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden bg-white shadow-lg flex flex-col">
              <div className="w-full h-50 cursor-pointer">
                <img
                  className="w-full h-full object-cover"
                  src={category.image}
                  alt={category.names}
                />
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
    </div>
  </section>
);
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
      <p className="text-xl font-semibold">${price}.00</p>
      <button className="mt-2 w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition">
        Add to Cart
      </button>
    </div>
  </div>
);
import { products } from "../../../../assets/Assets";
const FurnitureGrid = () => {
  return (
    <div className="bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-500 mx-auto py-12 px-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Furniture Collection</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};
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

const HomeContent = () => {
  const { blogs, categories, activeBlog, openComments, closeComments } = useBlogs();
  return (
    <div>
      <FurnceCollectionSection/>
      <CategoriesSection categories={categories} />
      <FurnatureItems/>
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
    </div>
  );
};

export default HomeContent;
