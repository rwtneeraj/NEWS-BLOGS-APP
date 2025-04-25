import React, { useState } from "react";
import userImg from "../assets/user.jpg";
import "./Blogs.css";
const Blogs = ({ onShowNews }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="blogs">
      <div className="blogs-left">
        <img src={userImg} alt="user-image" />
      </div>
      <div className="blogs-right">
        {showForm ? (
          <div className="blogs-right-form">
            <h1>New Post</h1>
            <form action="">
              <div className="image-upload">
                <label htmlFor="file-upload" className="file-upload">
                  <i className="bx bx-upload"></i>
                  upload image
                </label>
                <input type="file" name="" id="file-upload" />
              </div>
              <input
                type="text"
                value=""
                placeholder="Add title (Max 60 Characters)"
                className="title-input"
              />
              <textarea
                className="text-input"
                placeholder="Add text"
              ></textarea>
              <button type="submit" className="submit-btn">
                Submit button
              </button>
            </form>
          </div>
        ) : (
          <button className="post-btn" onClick={() => setShowForm(true)}>Create New Post</button>
        )}

        <button className="blogs-close-btn" onClick={onShowNews}>
          back <i className="bx bx-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};
export default Blogs;
