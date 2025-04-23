import React, { useState , useEffect} from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchDefaultWeather = async () => {
      const defaultLocation = "ramnagar";
      const API_Key = "0c7a8a415691bbad7bc684dc3a47e593";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&appid=${API_Key}&units=metric`;

      const response = await axios.get(url);
      setData(response.data);
    };

    fetchDefaultWeather();
  }, []);

  const search = async () => {
    const API_Key = "0c7a8a415691bbad7bc684dc3a47e593";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_Key}&units=metric`;
    try {
      const response = await axios.get(url);
      if (response.data.cod !== 200) {
        setData({ "Not_found": true });
      } else {
        setData(response.data);
        setLocation("");
      }
    } catch (error) {
        if (error.response && error.response.status === 400) {
        setData({ "Not_Found": true });
      } else {
        console.error("An unexpected error occured:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };
   
  const handleKeyDown = (e) => {
    if(e.key === "Enter"){
      search();
    }
  }

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case "Clear":
        return <i className="bx bxs-sun"></i>;
      case "Clouds":
        return <i className="bx bxs-cloud"></i>;
      case "Rain":
        return <i className="bx bxs-cloud-rain"></i>;
      case "Thunderstorm":
        return <i className="bx bxs-cloud-lightning"></i>;
      case "Snow":
        return <i className="bx bxs-cloud-snow"></i>;
      case "Mist":
      case "Haze":
        return <i className="bx bxs-cloud"></i>;
      default:
        return <i className="bx bxs-cloud"></i>;
    }
  };

  return (
    <div className="weather">
      <div className="search">
        <div className="search-top">
          <i className="fa-solid fa-location-dot"></i>
          <div className="location">{data.name}</div>
        </div>

        <div className="search-location">
          <input
            type="text"
            placeholder="select location"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            value={location}
          />
          <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
        </div>
      </div>
      {data.Not_Found ? (
        <div className="not-found">Not found</div>
      ) : (
        <div className="weather-data">
          {data.weather &&
            data.weather[0] &&
            getWeatherIcon(data.weather[0].main)}
          <div className="weather-type">
            {data.weather ? data.weather[0].main : null}
          </div>
          <div className="temp">
            {data.main ? `${Math.floor(data.main.temp)}°` : null}
          </div>
        </div>
      )}
    </div>
  );
}
