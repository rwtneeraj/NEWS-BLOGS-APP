import React from "react";
import demoImg from "../assets/demo.jpg";
import "./NewsModel.css";

const NewsModel = ({ show, article, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="model-overlay">
      <div className="model-content">
        <span className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>
        {article && (
          <>
            <img
              src={article.image}
              className="model-image"
              alt={article.title}
            />
            <h2 className="model-title">{article.title}</h2>
            <p className="model-source">{article.source.name}</p>
            <p className="model-date">
              {new Date(article.publishedAt).toLocaleDateString("en-us", {
                month: "short",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="model-content-text">{article.description} </p>
            <a href={article.url} target="_blank" rel='noopener noreferrel' className="read-more-link">
              Read More
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsModel;
