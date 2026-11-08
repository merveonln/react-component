import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cities from "../components/weather/cities";

const API_URL = "https://api.open-meteo.com/v1/forecast";

export const fetchWeather = createAsyncThunk("weather/fetch", async (city, { signal }) => {
  const params = new URLSearchParams({
    latitude: city.latitude,
    longitude: city.longitude,
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,pressure_msl,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
    forecast_days: "7",
    timezone: "auto",
  });
  const response = await fetch(`${API_URL}?${params}`, { signal });

  if (!response.ok) {
    throw new Error("Hava durumu verileri alinamadi.");
  }

  const data = await response.json();
  const current = data.current;

  return {
    cityName: city.name,
    current: {
      temperature: Math.round(current.temperature_2m),
      feelsLike: Math.round(current.apparent_temperature),
      humidity: current.relative_humidity_2m,
      precipitation: current.precipitation,
      pressure: Math.round(current.pressure_msl),
      windSpeed: Math.round(current.wind_speed_10m),
      weatherCode: current.weather_code,
    },
    updatedAt: current.time,
    forecast: data.daily.time.map((date, index) => ({
      date,
      weatherCode: data.daily.weather_code[index],
      maxTemp: Math.round(data.daily.temperature_2m_max[index]),
      minTemp: Math.round(data.daily.temperature_2m_min[index]),
      precipitationProbability: data.daily.precipitation_probability_max[index],
    })),
  };
});

const initialState = {
  cities,
  selectedCityName: "İstanbul",
  current: null,
  updatedAt: "",
  forecast: [],
  status: "idle",
  error: "",
  currentRequestId: undefined,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    selectCity: (state, action) => {
      state.selectedCityName = action.payload;
      state.current = null;
      state.forecast = [];
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        state.status = "loading";
        state.error = "";
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) {
          return;
        }

        state.current = action.payload.current;
        state.updatedAt = action.payload.updatedAt;
        state.forecast = action.payload.forecast;
        state.status = "succeeded";
        state.currentRequestId = undefined;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) {
          return;
        }

        if (action.meta.aborted) {
          state.status = "idle";
          state.currentRequestId = undefined;
          return;
        }

        state.status = "failed";
        state.error = action.error.message || "Hava durumu verileri yüklenemedi.";
        state.currentRequestId = undefined;
      });
  },
});

export const { selectCity } = weatherSlice.actions;
export default weatherSlice.reducer;