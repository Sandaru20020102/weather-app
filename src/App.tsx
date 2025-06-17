import React, { useState } from "react";

export default function App() {
  const [city, setCity] = useState("Colombo");
  const [country, setCountry] = useState("LK");
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const fetchWeather = async () => {
    setError(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`
      );
      if (!res.ok) {
        throw new Error("City not found or API error");
      }
      const data = await res.json();
      setWeather({
        city: data.name,
        country: data.sys.country,
        temperature: (data.main.temp - 273.15).toFixed(2),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      });
    } catch (err: any) {
      setWeather(null);
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Weather App</h1>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <input
          type="text"
          placeholder="Country (ISO code)"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <div>
          <h2>
            {weather.city}, {weather.country}
          </h2>
          <p>Temperature: {weather.temperature} °C</p>
          <p>Description: {weather.description}</p>
          <p>Humidity: {weather.humidity} %</p>
          <p>Wind Speed: {weather.windSpeed} m/s</p>
        </div>
      )}
    </div>
  );
}
