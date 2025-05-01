import React, { useEffect, useState } from "react";
import { News } from "./components/News";
import Blogs from "./components/Blogs";

import "./index.css";
export default function App() {
  const [showNews, setShowNews] = useState(true);
  const [showBlogs, setShowBlogs] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(()=>{
   const savedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
   setBlogs(savedBlogs);
  },[])

  const handleCreateBlogs = (newBlog) => {
    setBlogs((prevBlogs) => {
      const updatedBlog = [...prevBlogs,newBlog];
      localStorage.setItem("blogs",JSON.stringify(updatedBlog));
      return updatedBlog;
    });
  }

  const handleShowBlogs = () => {
    setShowBlogs(true);
    setShowNews(false);
  };

  const handleBackToNews = () => {
    setShowBlogs(false);
    setShowNews(true);
  };

  return (
    <div className="container">
      <div className="news-blogs-app">
        {showNews && <News onShowBlogs={handleShowBlogs} Blogs={blogs} />}
        {showBlogs && <Blogs onShowNews={handleBackToNews} onCreateBlog={handleCreateBlogs}/>}
      </div>
    </div>    
  );
}
