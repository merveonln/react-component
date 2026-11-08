import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Droplets,
  Gauge,
  Sun,
  Wind,
} from "lucide-react";
import { fetchWeather, selectCity } from "../../../redux/weatherSlice";
import "./WeatherApp.css";

const weekdayFormatter = new Intl.DateTimeFormat("tr-TR", { weekday: "long" });
const dateFormatter = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "short" });

function parseLocalDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getWeatherIcon(code, size = 38) {
  if (code === 0) return { icon: <Sun size={size} />, label: "Güneşli", tone: "sunny" };
  if ([1, 2].includes(code)) return { icon: <CloudSun size={size} />, label: "Parçalı bulutlu", tone: "partly-cloudy" };
  if (code === 3) return { icon: <Cloud size={size} />, label: "Bulutlu", tone: "cloudy" };
  if ([45, 48].includes(code)) return { icon: <CloudFog size={size} />, label: "Sisli", tone: "cloudy" };
  if ([51, 53, 55, 56, 57].includes(code)) return { icon: <CloudDrizzle size={size} />, label: "Çisenti", tone: "rainy" };
  if ([61, 63, 65, 80, 81, 82].includes(code)) return { icon: <CloudRain size={size} />, label: "Yağmurlu", tone: "rainy" };
  if ([66, 67, 71, 73, 75, 77, 85, 86].includes(code)) return { icon: <CloudSnow size={size} />, label: "Karlı", tone: "snowy" };
  if ([95, 96, 99].includes(code)) return { icon: <CloudLightning size={size} />, label: "Fırtınalı", tone: "rainy" };
  return { icon: <Cloud size={size} />, label: "Değişken", tone: "cloudy" };
}

function ForecastCard({ day, index }) {
  const weather = getWeatherIcon(day.weatherCode, 34);
  const date = parseLocalDate(day.date);

  return (
    <article className={`redux-weather-day ${index === 0 ? "is-today" : ""}`}>
      <span className="redux-weather-weekday">{index === 0 ? "Bugün" : weekdayFormatter.format(date)}</span>
      <span className="redux-weather-date">{dateFormatter.format(date)}</span>
      <span className={`redux-weather-day-icon ${weather.tone}`} aria-label={weather.label}>{weather.icon}</span>
      <span className="redux-weather-condition">{weather.label}</span>
      {day.precipitationProbability !== null && (
        <span className="redux-weather-rain">Yağış %{day.precipitationProbability}</span>
      )}
      <span className="redux-weather-day-temps"><strong>{day.maxTemp}°</strong><span>{day.minTemp}°</span></span>
    </article>
  );
}

export default function WeatherApp() {
  const dispatch = useDispatch();
  const {
    cities,
    selectedCityName,
    current,
    updatedAt,
    forecast,
    status,
    error,
  } = useSelector((state) => state.weather);
  const selectedCity = cities.find((city) => city.name === selectedCityName) || cities[0];

  useEffect(() => {
    const request = dispatch(fetchWeather(selectedCity));
    return () => request.abort();
  }, [dispatch, selectedCity]);

  const currentWeather = current ? getWeatherIcon(current.weatherCode, 74) : null;

  return (
    <main className="redux-weather-page">
      <div className="redux-weather-scene" aria-hidden="true"><span /><span /></div>
      <div className="redux-weather-layout">
        <header className="redux-weather-header">
          <div>
            <p className="redux-weather-kicker">TÜRKİYE HAVA RAPORU</p>
            <h1>Hava durumu</h1>
          </div>
          <label className="redux-weather-picker" htmlFor="redux-weather-city">
            <span>Şehir seç</span>
            <select
              id="redux-weather-city"
              value={selectedCityName}
              onChange={(event) => dispatch(selectCity(event.target.value))}
            >
              {cities.map((city) => <option key={city.name} value={city.name}>{city.name}</option>)}
            </select>
          </label>
        </header>

        <section className="redux-weather-now" aria-label={`${selectedCity.name} güncel hava durumu`}>
          <div className="redux-weather-now-primary">
            <p className="redux-weather-location">{selectedCity.name}, Türkiye</p>
            {current ? (
              <>
                <div className="redux-weather-current-reading">
                  <span className={`redux-weather-current-icon ${currentWeather.tone}`}>{currentWeather.icon}</span>
                  <strong>{current.temperature}<sup>°</sup></strong>
                </div>
                <p className="redux-weather-current-label">{currentWeather.label}</p>
              </>
            ) : (
              <p className="redux-weather-loading">{status === "failed" ? error : "Güncel hava durumu yükleniyor..."}</p>
            )}
          </div>

          {current && (
            <div className="redux-weather-details">
              <div><Wind size={17} /><span>Rüzgar</span><strong>{current.windSpeed} km/sa</strong></div>
              <div><Droplets size={17} /><span>Nem</span><strong>%{current.humidity}</strong></div>
              <div><Gauge size={17} /><span>Basınç</span><strong>{current.pressure} hPa</strong></div>
            </div>
          )}
          <div className="redux-weather-updated">
            {current && <span>Hissedilen {current.feelsLike}°</span>}
            {updatedAt && <span>Ölçüm {new Intl.DateTimeFormat("tr-TR", { hour: "2-digit", minute: "2-digit" }).format(new Date(updatedAt))}</span>}
          </div>
        </section>

        <section className="redux-weather-forecast" aria-labelledby="redux-weather-forecast-title">
          <div className="redux-weather-section-heading">
            <div><p className="redux-weather-kicker">BUGUNDEN İTİBAREN</p><h2 id="redux-weather-forecast-title">7 günlük tahmin</h2></div>
            <span>Open-Meteo · °C</span>
          </div>
          {status === "failed" && !forecast.length ? (
            <p className="redux-weather-error" role="alert">Veriler alınamadı. Lütfen şehir seçimini değiştirip tekrar deneyin.</p>
          ) : (
            <div className="redux-weather-week">
              {forecast.map((day, index) => <ForecastCard key={day.date} day={day} index={index} />)}
              {status === "loading" && !forecast.length && Array.from({ length: 7 }, (_, index) => (
                <div className="redux-weather-skeleton" key={index} aria-hidden="true" />
              ))}
            </div>
          )}
        </section>

        <footer className="redux-weather-footer">
          <span>Kaynak: Open-Meteo</span>
          <span>Günlük sıcaklıklar: en yüksek / en düşük</span>
        </footer>
      </div>
    </main>
  );
}