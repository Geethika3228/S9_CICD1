import axios from "axios";
import { useState } from "react";
import "./temperature.css";

import sunny from "../assets/sunny.mp4";
import rainy from "../assets/rainy.mp4";
import cloudy from "../assets/cloudy.mp4";
import windy from "../assets/windy.mp4";

function Temperature() {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(null);
  const [error, setError] = useState("");

  // default background video
  const [bgVideo, setBgVideo] = useState(sunny);

  const chooseBackground = (code) => {
    if (code === 0) return sunny;
    if ([1, 2, 3].includes(code)) return cloudy;
    if (code >= 51 && code <= 82) return rainy;
    if (code >= 45 && code <= 48) return windy;
    return sunny;
  };

  const fetchTemperature = async () => {
    try {
      setError("");

      const geo = await axios.get(
        "https://geocoding-api.open-meteo.com/v1/search",
        { params: { name: city, count: 1 } }
      );

      if (!geo.data.results) {
        setError("City not found");
        return;
      }

      const { latitude, longitude } = geo.data.results[0];

      const weather = await axios.get(
        "https://api.open-meteo.com/v1/forecast",
        {
          params: { latitude, longitude, current_weather: true }
        }
      );

      const current = weather.data.current_weather;

      setTemp(current.temperature);
      setBgVideo(chooseBackground(current.weathercode)); // 🔥 instant switch

    } catch {
      setError("Unable to fetch weather data");
    }
  };

  return (
    <div className="temp-wrapper">
      {/* VIDEO BACKGROUND ONLY */}
      <video
        key={bgVideo}
        className="bg-video"
        autoPlay
        muted
        loop
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="temp-card">
        <h2>Live City Temperature</h2>

        <input
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchTemperature()}
        />

        <button onClick={fetchTemperature}>Get Temperature</button>

        {temp !== null && (
          <div className="result">
            The current temperature in <b>{city}</b> is <b>{temp}°C</b>.
          </div>
        )}

        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default Temperature;
