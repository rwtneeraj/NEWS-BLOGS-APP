import React from "react";
import Weather from "./Weather";
import Calender from "./Calender.jsx";
import "./News.css";

export const News = () => {
  return (
    <div className="news">
      <header className="news-header">
        <h1 className="logo">News And Blogs</h1>
        <div className="search-bar">
          <form>
            <input type="text" placeholder="Search News..." />
            <button type="submit">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>
      <div className="news-content">
        <div className="navbar">
          <div className="user">User</div>
          <nav className="categories">Categories</nav>
        </div>
        <div className="news-section">
          <div className="headline"></div>
          <div className="news-grid">News Grid</div>
        </div>
        <div className="my-blogs"></div>
        <div className="weather-calender">
          <Weather />
          <Calender />
        </div>
      </div>
      <footer className="news-footer">Footer</footer>
    </div>
  );
};
