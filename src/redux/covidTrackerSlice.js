import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_ROOT = "https://disease.sh/v3/covid-19";

async function getJson(url, signal) {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`COVID API returned ${response.status}`);
  }

  return response.json();
}

export const fetchCountries = createAsyncThunk("covidTracker/fetchCountries", async (_, { signal }) => {
  const countries = await getJson(`${API_ROOT}/countries?sort=country`, signal);
  return countries.map((item) => item.country).sort((first, second) => first.localeCompare(second));
});

export const fetchCovidData = createAsyncThunk(
  "covidTracker/fetchData",
  async (country, { signal }) => {
    const subject = country === "world" ? "all" : `countries/${encodeURIComponent(country)}`;
    const historicalSubject = country === "world" ? "all" : encodeURIComponent(country);
    const [summary, historical] = await Promise.all([
      getJson(`${API_ROOT}/${subject}`, signal),
      getJson(`${API_ROOT}/historical/${historicalSubject}?lastdays=30`, signal),
    ]);

    return { country, summary, historical };
  }
);

const initialState = {
  countries: [],
  selectedCountry: "world",
  summary: null,
  chartData: [],
  countriesStatus: "idle",
  dataStatus: "idle",
  error: "",
  currentRequestId: undefined,
};

const covidTrackerSlice = createSlice({
  name: "covidTracker",
  initialState,
  reducers: {
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.countriesStatus = "loading";
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countriesStatus = "succeeded";
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        if (!action.meta.aborted) {
          state.countriesStatus = "failed";
          state.error = "Ülke listesi yüklenemedi. Lütfen tekrar deneyin.";
        }
      })
      .addCase(fetchCovidData.pending, (state, action) => {
        state.dataStatus = "loading";
        state.error = "";
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(fetchCovidData.fulfilled, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) {
          return;
        }

        const timeline = action.payload.country === "world"
          ? action.payload.historical
          : action.payload.historical.timeline;
        const cases = timeline?.cases || {};
        const deaths = timeline?.deaths || {};
        const recovered = timeline?.recovered || {};

        state.summary = action.payload.summary;
        state.chartData = Object.keys(cases)
          .map((date) => ({
            date,
            cases: cases[date] || 0,
            deaths: deaths[date] || 0,
            recovered: recovered[date] || 0,
            active: Math.max(0, (cases[date] || 0) - (deaths[date] || 0) - (recovered[date] || 0)),
          }))
          .sort((first, second) => new Date(first.date) - new Date(second.date));
        state.dataStatus = "succeeded";
        state.currentRequestId = undefined;
      })
      .addCase(fetchCovidData.rejected, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) {
          return;
        }

        if (action.meta.aborted) {
          state.dataStatus = state.summary ? "succeeded" : "idle";
          state.currentRequestId = undefined;
          return;
        }

        state.dataStatus = "failed";
        state.error = "COVID verileri yüklenemedi. Biraz sonra tekrar deneyin.";
        state.currentRequestId = undefined;
      });
  },
});

export const { setSelectedCountry } = covidTrackerSlice.actions;
export default covidTrackerSlice.reducer;