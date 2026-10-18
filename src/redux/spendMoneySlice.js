import { createSlice } from "@reduxjs/toolkit";

export const INITIAL_BALANCE = 100000000000;

const initialState = {
  balance: INITIAL_BALANCE,
  products: [
    { id: 1, name: "Big Mac", price: 2, emoji: "🍔", quantity: 0 },
    { id: 2, name: "Flip Flops", price: 3, emoji: "🩴", quantity: 0 },
    { id: 3, name: "Coca-Cola Pack", price: 5, emoji: "🥤", quantity: 0 },
    { id: 4, name: "Movie Ticket", price: 12, emoji: "🎟️", quantity: 0 },
    { id: 5, name: "Book", price: 20, emoji: "📚", quantity: 0 },
    { id: 6, name: "Video Game", price: 60, emoji: "🎮", quantity: 0 },
    { id: 7, name: "Headphones", price: 199, emoji: "🎧", quantity: 0 },
    { id: 8, name: "Smartphone", price: 999, emoji: "📱", quantity: 0 },
    { id: 9, name: "Gaming PC", price: 2500, emoji: "🖥️", quantity: 0 },
    { id: 10, name: "Luxury Watch", price: 15000, emoji: "⌚", quantity: 0 },
    { id: 11, name: "Sports Car", price: 250000, emoji: "🏎️", quantity: 0 },
    { id: 12, name: "House", price: 1000000, emoji: "🏡", quantity: 0 },
    { id: 13, name: "Private Jet", price: 35000000, emoji: "✈️", quantity: 0 },
    { id: 14, name: "Yacht", price: 150000000, emoji: "🛥️", quantity: 0 },
    { id: 15, name: "Skyscraper", price: 850000000, emoji: "🏙️", quantity: 0 },
    { id: 16, name: "Cruise Ship", price: 930000000, emoji: "🚢", quantity: 0 },
    { id: 17, name: "NBA Team", price: 2120000000, emoji: "🏀", quantity: 0 },
  ],
};

const spendMoneySlice = createSlice({
  name: "spendMoney",
  initialState,
  reducers: {
    buyProduct: (state, action) => {
      const product = state.products.find(
        (item) => item.id === action.payload
      );

      if (product && state.balance >= product.price) {
        product.quantity += 1;
        state.balance -= product.price;
      }
    },

    sellProduct: (state, action) => {
      const product = state.products.find(
        (item) => item.id === action.payload
      );

      if (product && product.quantity > 0) {
        product.quantity -= 1;
        state.balance += product.price;
      }
    },

    resetPurchases: () => initialState,
  },
});

export const { buyProduct, sellProduct, resetPurchases } =
  spendMoneySlice.actions;

export default spendMoneySlice.reducer