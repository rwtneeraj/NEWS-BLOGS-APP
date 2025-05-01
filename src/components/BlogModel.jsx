import React from "react";
import "./BlogModel.css";
import "./Model.css";

const BlogModel = ({ show, blog, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="model-overlay">
      <div className="model-content">
        <span className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>
        {blog.image && <img src={blog.image} alt={blog.title} className="blog-model-image" />}
        <h2 className="blog-model-title">{blog.title}</h2>  
        <p className="blog-post-content">{blog.content} </p>
      </div>
    </div>
  );
};

export default BlogModel;
