import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<{
    temperature: number;
    description: string;
    icon: string;
  } | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Get the user's current location information
        navigator.geolocation.getCurrentPosition(async (position) => {
          const apiKey = "6628097ebc0d1c7cb7c97af88736f51c";
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Use the latitude and longitude information to call the weather API to obtain weather data
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

          const response = await axios.get(apiUrl);

          const { main, weather } = response.data;
          setWeatherData({
            temperature: main.temp,
            description: weather[0].description,
            icon: weather[0].icon,
          });
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="weather-container">
      {weatherData ? (
        <div className="weather-content">
          <div className="weather-icon">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`}
              alt="Weather Icon"
            />
          </div>
          <div className="weather-details">
            <p className="temperature">{weatherData.temperature}°C</p>
            <p className="description">{weatherData.description}</p>
          </div>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
