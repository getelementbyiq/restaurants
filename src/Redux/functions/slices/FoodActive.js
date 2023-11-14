// addStatusSlice.js
import { createSlice } from "@reduxjs/toolkit";

const foodActiveSlice = createSlice({
  name: "foodActive",
  initialState: false, // Initialer Status auf "false"
  reducers: {
    setFoodActiveRed: (state, action) => {
      return action.payload;
    },
  },
});

export const { setFoodActiveRed } = foodActiveSlice.actions;

export default foodActiveSlice.reducer;
