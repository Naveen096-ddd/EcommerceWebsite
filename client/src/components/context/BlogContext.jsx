
import React, { createContext, useState, useContext } from "react";
import { blogsData as initialBlogs } from "../../assets/Assets";
import {categories as catagoriesForBlogs} from '../../assets/Assets';
const BlogsContext = createContext();
export const BlogsProvider = ({ children }) => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [categories, setCategories] = useState(catagoriesForBlogs);
  const [activeBlog, setActiveBlog] = useState(null);
  const openComments = (blogId) => {
    setActiveBlog(blogId);
  };
  const closeComments = () => {
    setActiveBlog(null);
  };

  return (
    <BlogsContext.Provider
      value={{ blogs, activeBlog,categories, setCategories, openComments, closeComments, setBlogs }}
    >
      {children}
    </BlogsContext.Provider>
  );
};
export const useBlogs = () => useContext(BlogsContext);
