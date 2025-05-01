import React, { useEffect, useState } from "react";
import { News } from "./components/News";
import Blogs from "./components/Blogs";
import "./index.css";

export default function App() {
  const [showNews, setShowNews] = useState(true);
  const [showBlogs, setShowBlogs] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    setBlogs(savedBlogs);
  }, []);

  const handleCreateBlogs = (newBlog, isEditing) => {
    setBlogs((prevBlogs) => {
      const updatedBlog = isEditing
        ? prevBlogs.map((blog) => (blog === selectedPost ? newBlog : blog))
        : [...prevBlogs, newBlog];
      localStorage.setItem("blogs", JSON.stringify(updatedBlog));
      return updatedBlog;
    });

    setIsEditing(false);
    setSelectedPost(null);
  };

  const handleEditBlog = (blog) => {
    setSelectedPost(blog);
    setIsEditing(true);
    setShowNews(false);
    setShowBlogs(true);
  };

  const handleDeleteBlog = (blogToDelete) => {
    setBlogs((prevBlogs) => {
      const updatedBlogs = prevBlogs.filter((blog) => blog !== blogToDelete)
      localStorage.setItem("blogs",JSON.stringify(updatedBlogs));
      return updatedBlogs;
    })

  }

  const handleShowBlogs = () => {
    setShowBlogs(true);
    setShowNews(false);
  };

  const handleBackToNews = () => {
    setShowBlogs(false);
    setShowNews(true);
    setIsEditing(false);
    setSelectedPost(null);
  };



  return (
    <div className="container">
      <div className="news-blogs-app">
        {showNews && <News onShowBlogs={handleShowBlogs} Blogs={blogs} onEditBlog={handleEditBlog} onDeleteBlog={handleDeleteBlog}/>}
        {showBlogs && (
          <Blogs
            onShowNews={handleBackToNews}
            onCreateBlog={handleCreateBlogs}
            editPost={selectedPost}
            isEditing={isEditing}
          />
        )}
      </div>
    </div>
  );
}
