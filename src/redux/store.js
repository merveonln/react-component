import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notesSlice";
import spendMoneyReducer from "./spendMoneySlice";
import memoryGameReducer from "./memoryGameSlice";
import textGeneratorReducer from "./textGeneratorSlice";
import covidTrackerReducer from "./covidTrackerSlice";
import weatherReducer from "./weatherSlice";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    spendMoney: spendMoneyReducer,
    memoryGame: memoryGameReducer,
    textGenerator: textGeneratorReducer,
    covidTracker: covidTrackerReducer,
    weather: weatherReducer,
  },
});