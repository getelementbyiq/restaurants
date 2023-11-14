// addStatusSlice.js
import { createSlice } from "@reduxjs/toolkit";

const setSelectedCategorySlice = createSlice({
  name: "selectedCategory",
  initialState: null, // Initialer Status auf "false"
  reducers: {
    setSelectedCategory: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSelectedCategory } = setSelectedCategorySlice.actions;

export default setSelectedCategorySlice.reducer;
