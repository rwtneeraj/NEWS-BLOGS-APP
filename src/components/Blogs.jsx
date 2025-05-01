import React, { useEffect, useState } from "react";
import userImg from "../assets/user.jpg";
import noImg from "../assets/no-img.png";
import "./Blogs.css";

const Blogs = ({ onShowNews , onCreateBlog,editPost,isEditing}) => {
  const [showForm, setShowForm] = useState(false);
  const [image,setImage] = useState(null);
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
  const [submitted,setSubmitted] = useState(false);
  const [titieValid,setTitleValid] = useState(true);
  const [contentValid,setContentValid] = useState(true);
 
  useEffect(()=>{
    if(isEditing && editPost) {
      setImage(editPost.image);
      setContent(editPost.content);
      setTitle(editPost.title);
      setShowForm(true);
    } else {
      setImage(null);
      setContent("");
      setTitle("");
      setShowForm(false);
    }
  },[isEditing,editPost])

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setTitleValid(true);
  }

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setContentValid(true);      
  }

  const handleImageChange = (e) => {
     if(e.target.files && e.target.files[0]){
      const file = e.target.files[0];
      const maxSize = 1 * 1024 * 1024;
      
      if(file.size > maxSize){
        alert("File Size exceed 1 MB");
        return
      }

      const reader= new FileReader()
      reader.onload = () => {
        setImage(reader.result);
      }

      reader.readAsDataURL(file)
     }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

   if(!title || !content){
    if(!title) setTitleValid(false);
    if(!content) setContentValid(false);
    return;
   }

   const newBlogs= {image:image || noImg,title,content};
   onCreateBlog(newBlogs,isEditing);
   setImage(null);
   setTitle("");
   setContent("");
   setShowForm(false);
   setSubmitted(true);

   setTimeout(() => {
   setSubmitted(false)
   onShowNews(); 
   },3000)
  }

  return (
    <div className="blogs">
      <div className="blogs-left">
        <img src={userImg} alt="user-image" />
      </div>
      <div className="blogs-right">
        {!showForm && !submitted && 
          <button className="post-btn" onClick={() => setShowForm(true)}>Create New Post</button>
        }  
        {submitted && <p className="submission-message">Post Submitted...</p>}
          <div className={`blogs-right-form ${showForm ? "visible" : "hidden"}`}>
            <h1>{isEditing ? "Edit Post" : "New Post"}</h1>
            <form action="" onSubmit={handleSubmit}>
              <div className="image-upload">
                <label htmlFor="file-upload" className="file-upload">
                  <i className="bx bx-upload"></i>
                  upload image
                </label>
                <input type="file" name="" id="file-upload" onChange={handleImageChange} />
              </div>
              <input
                type="text"
                value={title}
                placeholder="Add title (Max 60 Characters)"
                className={`title-input ${titieValid ? "" : "invalid"}`}
                onChange={handleTitleChange}
                maxLength={60}
              />
               
              <textarea
                className={`text-input ${contentValid ? "" : "invalid"}`}
                placeholder="Add text"
                value={content}
                onChange={handleContentChange}
              ></textarea>
              <button type="submit" className="submit-btn">
                {isEditing ? "Update Post" : "Submit Post"}
              </button>
            </form>
          </div>

        <button className="blogs-close-btn" onClick={onShowNews}>
          back <i className="bx bx-chevron-right"></i>
        </button>

      </div>
    </div>
  );
};
export default Blogs;
