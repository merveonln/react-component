import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notesSlice";
import spendMoneyReducer from "./spendMoneySlice";
import memoryGameReducer from "./memoryGameSlice";
import textGeneratorReducer from "./textGeneratorSlice";
import covidTrackerReducer from "./covidTrackerSlice";
import weatherReducer from "./weatherSlice";
import typingSpeedReducer from "./typingSpeedSlice";
import turkishDraughtsReducer from "./turkishDraughtsSlice";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    spendMoney: spendMoneyReducer,
    memoryGame: memoryGameReducer,
    textGenerator: textGeneratorReducer,
    covidTracker: covidTrackerReducer,
    weather: weatherReducer,
    typingSpeed: typingSpeedReducer,
    turkishDraughts: turkishDraughtsReducer,
  },
});