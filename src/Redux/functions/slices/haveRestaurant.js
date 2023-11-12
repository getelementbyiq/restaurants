import { createSlice } from "@reduxjs/toolkit";

const haveRestaurantSlice = createSlice({
  name: "haveRestaurant",
  initialState: [0],
  reducers: {
    setHaveRestaurant: (state, action) => {
      const counter = state[state.length - 1]; // Hole den aktuellen Zähler
      const newCounter = counter + 1; // Erhöhe den Zähler um eins
      return [...state, newCounter]; // Füge den neuen Zähler zum Zustand hinzu
    },
  },
});

export const { setHaveRestaurant } = haveRestaurantSlice.actions;

export default haveRestaurantSlice.reducer;
