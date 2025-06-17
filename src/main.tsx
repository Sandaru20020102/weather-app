import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

type WeatherData = {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
};

const countryCityMap: Record<string, string[]> = {
  "India": ["Delhi", "Mumbai", "Bangalore", "Chennai"],
  "USA": ["New York", "Los Angeles", "Chicago", "Houston"],
  "UK": ["London", "Manchester", "Birmingham", "Leeds"],
  "Japan": ["Tokyo", "Osaka", "Kyoto", "Nagoya"],
};

const App = () => {
  const [country, setCountry] = useState<string>("India");
  const [city, setCity] = useState<string>(countryCityMap["India"][0]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Update city when country changes
  useEffect(() => {
    setCity(countryCityMap[country][0]);
    setWeather(null);
    setError("");
  }, [country]);

  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const apiKey = "129468835d01076d7ce2795009b34a50"; // 🔐 Hardcoded API Key

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("City not found or API error");
      }

      const data = await response.json();

      const temperature = data.main.temp - 273.15;

      setWeather({
        temperature: parseFloat(temperature.toFixed(2)),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <h1>Weather App</h1>
      <p className="subtitle">Select your country and city</p>

      <label htmlFor="country-select">Country</label>
      <select
        id="country-select"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      >
        {Object.keys(countryCityMap).map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <label htmlFor="city-select">City</label>
      <select
        id="city-select"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      >
        {countryCityMap[country].map((cityName) => (
          <option key={cityName} value={cityName}>
            {cityName}
          </option>
        ))}
      </select>

      <button onClick={fetchWeather} disabled={loading}>
        {loading ? "Loading..." : "Get Weather"}
      </button>

      {error && <div className="error-message">{error}</div>}

      {weather && (
        <div className="weather-result" aria-live="polite">
          <p>
            <strong>Temperature:</strong> {weather.temperature}°C
          </p>
          <p>
            <strong>Conditions:</strong> {weather.description}
          </p>
          <p>
            <strong>Humidity:</strong> {weather.humidity}%
          </p>
          <p>
            <strong>Wind Speed:</strong> {weather.windSpeed} m/s
          </p>
        </div>
      )}
    </>
  );
};

const container = document.getElementById("root");
if (!container) throw new Error("No root container found");
const root = createRoot(container);
root.render(<App />);
