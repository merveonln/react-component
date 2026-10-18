import React from "react";
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
} from "lucide-react";
import Footer from "../layout/footer";
import Navbar from "../layout/navbar";
import { useWeather, WeatherProvider } from "./WeatherContext";
import "./weather.css";

const dayFormatter = new Intl.DateTimeFormat("tr-TR", { weekday: "short" });
const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "2-digit",
  month: "short",
});

function getWeatherVisual(weatherCode) {
  if (weatherCode === 0) {
    return {
      icon: <Sun size={44} strokeWidth={1.75} />,
      label: "Güneşli",
      className: "sunny",
    };
  }

  if ([1, 2].includes(weatherCode)) {
    return {
      icon: <CloudSun size={44} strokeWidth={1.75} />,
      label: "Parçalı bulutlu",
      className: "partly-cloudy",
    };
  }

  if (weatherCode === 3) {
    return {
      icon: <Cloud size={44} strokeWidth={1.75} />,
      label: "Bulutlu",
      className: "cloudy",
    };
  }

  if ([45, 48].includes(weatherCode)) {
    return {
      icon: <CloudFog size={44} strokeWidth={1.75} />,
      label: "Sisli",
      className: "foggy",
    };
  }

  if ([51, 53, 55, 56, 57].includes(weatherCode)) {
    return {
      icon: <CloudDrizzle size={44} strokeWidth={1.75} />,
      label: "Çisenti",
      className: "drizzle",
    };
  }

  if ([61, 63, 65, 80, 81, 82].includes(weatherCode)) {
    return {
      icon: <CloudRain size={44} strokeWidth={1.75} />,
      label: "Yağmurlu",
      className: "rainy",
    };
  }

  if ([66, 67, 71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    return {
      icon: <CloudSnow size={44} strokeWidth={1.75} />,
      label: "Karlı",
      className: "snowy",
    };
  }

  if ([95, 96, 99].includes(weatherCode)) {
    return {
      icon: <CloudLightning size={44} strokeWidth={1.75} />,
      label: "Fırtınalı",
      className: "stormy",
    };
  }

  return {
    icon: <Cloud size={44} strokeWidth={1.75} />,
    label: "Değişken",
    className: "cloudy",
  };
}

function WeatherCard({ item, index }) {
  const visual = getWeatherVisual(item.weatherCode);
  const weekday = dayFormatter.format(new Date(item.date));
  const formattedDate = dateFormatter.format(new Date(item.date));

  return (
    <article className={`weather-card ${index === 0 ? "is-today" : ""}`}>
      <div className="weather-card-head">
        <p>{weekday}</p>
        <span>{index === 0 ? "Bugun" : formattedDate}</span>
      </div>

      <div className={`weather-icon ${visual.className}`}>{visual.icon}</div>

      <p className="weather-status">{visual.label}</p>

      <div className="weather-temps">
        <strong>{item.maxTemp}°</strong>
        <span>{item.minTemp}°</span>
      </div>
    </article>
  );
}

function WeatherContent() {
  const {
    cities,
    error,
    forecast,
    lastUpdated,
    loading,
    selectedCity,
    selectedCityName,
    setSelectedCityName,
  } = useWeather();

  return (
    <>
      <Navbar />
      <main className="weather-page">
        <section className="weather-shell">
          <div className="weather-heading">
            <div>
              <p className="weather-kicker">Türkiye 7 Günlük Tahmin</p>
              <h1>{selectedCity.name} için haftalık hava raporu</h1>
              <p className="weather-subtitle">
                Günlük en yüksek ve en düşük sıcaklıklar, güncel meteorolojik tahminlere göre getiriliyor.
              </p>
            </div>

            <div className="weather-controls">
              <label htmlFor="city-select">Şehir Seç</label>
              <select
                id="city-select"
                value={selectedCityName}
                onChange={(event) => setSelectedCityName(event.target.value)}
              >
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="weather-summary">
            <div>
              <span className="summary-label">Konum</span>
              <strong>{selectedCity.name}, Türkiye</strong>
            </div>
            <div>
              <span className="summary-label">Veri Kaynağı</span>
              <strong>Open-Meteo Forecast API</strong>
            </div>
            <div>
              <span className="summary-label">Son Güncelleme</span>
              <strong>{lastUpdated || "Bekleniyor"}</strong>
            </div>
          </div>

          {loading ? (
            <div className="weather-feedback">Veriler yükleniyor...</div>
          ) : null}

          {!loading && error ? <div className="weather-feedback error">{error}</div> : null}

          {!loading && !error ? (
            <div className="weather-grid">
              {forecast.map((item, index) => (
                <WeatherCard key={item.date} item={item} index={index} />
              ))}
            </div>
          ) : null}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function WeatherPage() {
  return (
    <WeatherProvider>
      <WeatherContent />
    </WeatherProvider>
  );
}