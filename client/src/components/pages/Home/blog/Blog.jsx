import React from "react";
import { useBlogs } from "../../../context/BlogContext";
import Footer from "../footer/Footer";
import Header from "../header/Header";
const Blogs = () => {
  const { blogs, activeBlog, openComments, closeComments } = useBlogs();
  return (
    <>
    <Header/>
    <section className="text-gray-600 body-font bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-500 cursor-pointer">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">
          Discover the Latest in Furniture & Home Decor
        </h1>
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
    </section>
    <Footer/>
    </>
  );
};

export default Blogs;
