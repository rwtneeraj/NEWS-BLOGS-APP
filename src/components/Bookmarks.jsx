import React from "react";
import "./Model.css";
import "./Bookmarks.css";
import demoImg from "../assets/demo.jpg";
import noImg from "../assets/no-img.png";

const bookmarks = ({
  show,
  bookmarks,
  onClose,
  onSelectedArticle,
  deleteArticle,
}) => {
  if (!show) {
    return null;
  }

  return (
    <div className="model-overlay">
      <div className="model-content">
        <span className="close-button">
          <i className="fa-solid fa-xmark" onClick={onClose}></i>
        </span>

        <h2 className="bookmarks-heading">{bookmarks.title||""}</h2>

        <div className="bookmarks list">
          {bookmarks.map((article, index) => (
            <div
              className="bookmarks-item"
              key={index}
              onClick={() => onSelectedArticle(article)}
            >
              <img src={article.image || noImg} alt="Bookmark Image" />
              <h3 className="bookmark-title">{article.title}</h3>
              <span className="delete-button">
                <i
                  className="fa-regular fa-circle-xmark"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteArticle(article);
                  }}
                ></i>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default bookmarks;
