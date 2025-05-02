import React from "react";
import Weather from "./Weather";
import Calender from "./Calender.jsx";
import NewsModel from "./NewsModel.jsx";
import Bookmarks from "./Bookmarks.jsx";
import BlogsModel from "./BlogModel.jsx";
import "./News.css";
import userImg from "../assets/user.jpg";
import noImg from "../assets/no-img.png";
import blog1 from "../assets/blog1.jpg";
import blog2 from "../assets/blog2.jpg";
import blog3 from "../assets/blog3.jpg";
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

export const News = ({ onShowBlogs, Blogs, onEditBlog, onDeleteBlog }) => {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarksModel, setShowBookmarksModel] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showBlogModel, setShowBlogModel] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = "a59fe809c163ee7d0f91b4fd7dc210d4"; //  api key
      let url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=${apiKey}`; //   api url

      if (searchQuery) {
        url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=${apiKey}`;
      }

      const response = await axios.get(url);
      const fetchedNews = response.data.articles;

      fetchedNews.forEach((article) => {
        if (!article.image) {
          article.image = noImg;
        }
      });

      setHeadline(fetchedNews[0]);
      setNews(fetchedNews.slice(1, 7));

      const savedBookmarks =
        JSON.parse(localStorage.getItem("bookmarks")) || [];
      setBookmarks(savedBookmarks);
    };

    fetchNews();
  }, [searchQuery, selectedCategory]);

  const handleCategory = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setSearchInput("");
  };

  const handleArticle = (article) => {
    setSelectedArticle(article);
    setShowModel(true);
  };

  const handleBookmark = (article) => {
    setBookmarks((prevBookmark) => {
      const updateBookmark = prevBookmark.find(
        (bookmark) => bookmark.title === article.title
      )
        ? prevBookmark.filter((bookmark) => bookmark.title !== article.title)
        : [...prevBookmark, article];
      localStorage.setItem("bookmarks", JSON.stringify(updateBookmark));
      return updateBookmark;
    });
  };

  const handleBlog = (blog) => {
    setSelectedPost(blog);
    setShowBlogModel(true);
  };

  const closeBlogModel = () => {
    setShowBlogModel(false);
    setSelectedPost(null);
  };

  return (
    <div className="news">
      <header className="news-header">
        <h1 className="logo">News And Blogs</h1>
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search News..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>
      <div className="news-content">
        <div className="navbar">
          <div className="user" onClick={onShowBlogs}>
            <img src={userImg} alt="User Img" />
            <p>Mari's Blog</p>
          </div>
          <nav className="categories">
            <h1 className="nav-heading">Categories</h1>

            <div className="nav-links">
              {categories.map((category) => {
                return (
                  <a
                    href=""
                    className="nav-link"
                    key={category}
                    onClick={(e) => handleCategory(e, category)}
                  >
                    {category}
                  </a>
                );
              })}

              <a
                href="#"
                className="nav-link"
                onClick={() => setShowBookmarksModel(true)}
              >
                Bookmarks <i className="fa-solid fa-bookmark"></i>
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
                <i
                  className={`${
                    bookmarks.some(
                      (bookmark) => bookmark.title === headline.title
                    )
                      ? "fa-solid"
                      : "fa-regular"
                  } fa-bookmark bookmark`}
                  onClick={(e) =>
                    e.stopPropagation() || handleBookmark(headline)
                  }
                ></i>
              </h2>
            </div>
          )}
          <div className="news-grid">
            {news.map((article, index) => (
              <div
                key={index}
                className="news-grid-item"
                onClick={() => handleArticle(article)}
              >
                <img src={article.image || noImg} alt="" />
                <h3>
                  {article.title}
                  <i
                    className={`${
                      bookmarks.some(
                        (bookmark) => bookmark.title === article.title
                      )
                        ? "fa-solid"
                        : "fa-regular"
                    } fa-bookmark bookmark`}
                    onClick={(e) =>
                      e.stopPropagation() || handleBookmark(article)
                    }
                  ></i>
                </h3>
              </div>
            ))}
          </div>
        </div>
        
        <NewsModel
          show={showModel}
          article={selectedArticle}
          onClose={() => setShowModel(false)}
        />
      
        <Bookmarks
          show={showBookmarksModel}
          bookmarks={bookmarks}
          onClose={() => setShowBookmarksModel(false)}
          onSelectArticle={handleArticle}
          deleteArticle={handleBookmark}
        />
        
        <div className="my-blogs">
          <h1 className="my-blog-heading">My Blogs</h1>
          <div className="blog-posts">
            {Blogs.map((blog, index) => {
              return (
                <div
                  key={index}
                  className="blog-post"
                  onClick={() => handleBlog(blog)}
                >
                  <img src={blog.image || noImg} alt={blog.title} className="blog-image" />
                  <h3>{blog.title}</h3>
                  <div className="post-buttons">
                    <button
                      className="edit-button"
                      onClick={() => onEditBlog(blog)}
                    >
                      <i className="bx bxs-edit"></i>
                    </button>
                    <button
                      className="delete-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteBlog(blog);
                      }}
                    >
                      <i className="bx bxs-x-circle"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {selectedPost && showBlogModel && (
            <BlogsModel
              show={showBlogModel}
              blog={selectedPost}
              onClose={closeBlogModel}
            />
          )}
        </div>
        <div className="weather-calender">
          <Weather />
          <Calender />
        </div>
      </div>
      <footer className="news-footer">
        <p>
          <span>News & Blogs App</span>
        </p>
        <p>&copy; All Right Reserved.</p>
      </footer>
    </div>
  );
};
