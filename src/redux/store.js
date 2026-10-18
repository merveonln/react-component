import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notesSlice";
import spendMoneyReducer from "./spendMoneySlice";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    spendMoney: spendMoneyReducer,
  },
});