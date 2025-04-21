import React from "react";
import Weather from "./Weather";
import Calender from "./Calender.jsx";
import "./News.css";
import userImg from "../assets/user.jpg";
import techImg from "../assets/tech.jpg";
import scienceImg from "../assets/science.jpg";
import worldImg from "../assets/world.jpg";
import healthImg from "../assets/health.jpg";
import sportsImg from "../assets/sports.jpg";
import nationImg from "../assets/nation.jpg";
import noImg from "../assets/no-image.png";

import axios from "axios";

import { useState, useEffect } from "react";
export const News = () => {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = "a59fe809c163ee7d0f91b4fd7dc210d4";
      const url =
        "https://gnews.io/api/v4/top-headlines?category=technology&apikey=a59fe809c163ee7d0f91b4fd7dc210d4";
      const fetchData = axios.create;

      const response = await axios.get(url);
      const fetchedNews = response.data.articles;
      setHeadline(fetchedNews[0]);
      setNews(fetchedNews.slice(1, 7));
    };
    fetchNews();
  }, []);

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
          <div className="user">
            <img src={userImg} alt="User Img" />
            <p>Mari's Blog</p>
          </div>
          <nav className="categories">
            <h1 className="nav-heading">Categories</h1>
            <div className="nav-links">
              <a href="" className="nav-link">
                General
              </a>
              <a href="" className="nav-link">
                World
              </a>
              <a href="" className="nav-link">
                Business
              </a>
              <a href="" className="nav-link">
                Technology
              </a>
              <a href="" className="nav-link">
                Entertainment
              </a>
              <a href="" className="nav-link">
                Sports
              </a>
              <a href="" className="nav-link">
                Science
              </a>
              <a href="" className="nav-link">
                Health
              </a>
              <a href="" className="nav-link">
                Nation
              </a>
              <a href="" className="nav-link">
                Bookmarks <i className="fa-regular fa-bookmark"></i>
              </a>
            </div>
          </nav>
        </div>
        <div className="news-section">
          {headline && (
            <div className="headline">
              <img src={headline.image} alt={headline.title} />
              <h2 className="headline-title">
                {headline.title}{" "}
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h2>
            </div>
          )}
          <div className="news-grid">
            {news.map((article, index) => (
              <div key={index} className="news-grid-item">
                <img src={article.image} alt={article.image} />
                <h3>
                  {article.title}
                  <i className="fa-regular fa-bookmark bookmark"></i>
                </h3>
              </div>
            ))}


          </div>
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
