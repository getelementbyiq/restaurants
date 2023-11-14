// addStatusSlice.js
import { createSlice } from "@reduxjs/toolkit";

const drinksActiveSlice = createSlice({
  name: "drinksActive",
  initialState: false, // Initialer Status auf "false"
  reducers: {
    setDrinksActiveRed: (state, action) => {
      return action.payload;
    },
  },
});

export const { setDrinksActiveRed } = drinksActiveSlice.actions;

export default drinksActiveSlice.reducer;
