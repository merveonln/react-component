import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import cities from "./cities";

const WeatherContext = createContext(null);

const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";

function buildForecastUrl(city) {
  const params = new URLSearchParams({
    latitude: city.latitude,
    longitude: city.longitude,
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    forecast_days: "7",
    timezone: "auto",
  });

  return `${WEATHER_API_URL}?${params.toString()}`;
}

export function WeatherProvider({ children }) {
  const [selectedCityName, setSelectedCityName] = useState("Istanbul");
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const selectedCity = useMemo(
    () => cities.find((city) => city.name === selectedCityName) ?? cities[0],
    [selectedCityName]
  );

  useEffect(() => {
    const controller = new AbortController();

    async function fetchForecast() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(buildForecastUrl(selectedCity), {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Hava durumu verisi alinamadi.");
        }

        const data = await response.json();
        const mappedForecast = data.daily.time.map((date, index) => ({
          date,
          weatherCode: data.daily.weather_code[index],
          maxTemp: Math.round(data.daily.temperature_2m_max[index]),
          minTemp: Math.round(data.daily.temperature_2m_min[index]),
        }));

        setForecast(mappedForecast);
        setLastUpdated(new Date().toLocaleTimeString("tr-TR", {
          hour: "2-digit",
          minute: "2-digit",
        }));
      } catch (fetchError) {
        if (fetchError.name === "AbortError") {
          return;
        }

        setError("Hava durumu verisi şu anda getirilemiyor. lütfen tekrar deneyin.");
        setForecast([]);
      } finally {
        setLoading(false);
      }
    }

    fetchForecast();

    return () => {
      controller.abort();
    };
  }, [selectedCity]);

  const value = useMemo(
    () => ({
      cities,
      error,
      forecast,
      lastUpdated,
      loading,
      selectedCity,
      selectedCityName,
      setSelectedCityName,
    }),
    [error, forecast, lastUpdated, loading, selectedCity, selectedCityName]
  );

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
}

export function useWeather() {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error("useWeather must be used within WeatherProvider");
  }

  return context;
}