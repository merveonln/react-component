import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notesSlice";
import spendMoneyReducer from "./spendMoneySlice";
import memoryGameReducer from "./memoryGameSlice";
import textGeneratorReducer from "./textGeneratorSlice";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    spendMoney: spendMoneyReducer,
    memoryGame: memoryGameReducer,
    textGenerator: textGeneratorReducer,
  },
});