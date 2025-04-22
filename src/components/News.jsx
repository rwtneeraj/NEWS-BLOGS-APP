import React from "react";
import Weather from "./Weather";
import Calender from "./Calender.jsx";
import NewsModel from "./NewsModel.jsx";
import "./News.css";
import userImg from "../assets/user.jpg";
import noImg from "../assets/no-img.png";
// import techImg from "../assets/tech.jpg";
// import scienceImg from "../assets/science.jpg";
// import worldImg from "../assets/world.jpg";
// import healthImg from "../assets/health.jpg";
// import sportsImg from "../assets/sports.jpg";
// import nationImg from "../assets/nation.jpg";
// import noImg from "../assets/no-image-png";

import axios from "axios";
import { useState, useEffect } from "react";

const categories = [
  "General",
  "World",
  "Business",
  "Technology",
  "Entertainment",
  "Sports",
  "Science",
  "Health",
  "Nation",
];

export const News = () => {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [searchInput,setSearchInput] = useState("");
  const [searchQuery,setSearchQuery] = useState("");
  const[showModel,setShowModel] = useState(false);
  const [selectedArticle,setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = "a59fe809c163ee7d0f91b4fd7dc210d4"; //  api key
      let url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=${apiKey}`; //   api url

      if(searchQuery) {
        url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=${apiKey}`; 
      }

      const fetchData = axios.create;
      const response = await axios.get(url);
      const fetchedNews = response.data.articles;
         
      fetchedNews.forEach((article) => {
        if (!article.image) {
          article.image = noImg;
        }
      });

      setHeadline(fetchedNews[0]);
      setNews(fetchedNews.slice(1, 7));
    };

    fetchNews();
  }, [searchInput]);
  
  const handleCategory = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setSearchInput("");
  }
 
  const handleArticle = (article) => {
    setSelectedArticle(article);
    setShowModel(true)
    console.log(article)
  }
  return (
    <div className="news">
      <header className="news-header">
        <h1 className="logo">News And Blogs</h1>
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input type="text" placeholder="Search News..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
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
              {categories.map((category) => {
                return (
                  <a href="#" className="nav-link" key={category} onClick={(e) => handleCategory(e, category)}>
                    {category}
                  </a>
                );
              })}

              <a href="" className="nav-link">
                Bookmarks <i className="fa-regular fa-bookmark"></i>
              </a>
            </div>
          </nav>
        </div>
        <div className="news-section">
          {headline && (
            <div className="headline" onClick={() => handleArticle(headline)}>
              <img src={headline.image || noImg} alt={headline.title} />
              <h2 className="headline-title">
                {headline.title}{" "}
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h2>
            </div>
          )}
          <div className="news-grid">
            {news.map((article, index) => (
              <div key={index} className="news-grid-item" onClick={() => handleArticle(article)}>
                <img src={article.image || noImg} alt={article.image} />
                <h3>
                  {article.title}
                  <i className="fa-regular fa-bookmark bookmark"></i>
                </h3>
              </div>
            ))}
          </div>
        </div>
        <NewsModel show ={showModel} article = {selectedArticle} onClose = {()=>setShowModel(false)}/>
        <div className="my-blogs">Myblog</div>
        <div className="weather-calender">
          <Weather />
          <Calender />
        </div>
      </div>
      <footer className="news-footer">Footer</footer>
    </div>
  );
};
