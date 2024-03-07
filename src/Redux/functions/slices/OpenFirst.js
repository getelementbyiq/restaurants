// addStatusSlice.js
import { createSlice } from "@reduxjs/toolkit";

const createRestaurantStateSlice = createSlice({
  name: "searchResult",
  initialState: "first", // Initialer Status auf "false"
  reducers: {
    setCreateRestaurantState: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCreateRestaurantState } = createRestaurantStateSlice.actions;

export default createRestaurantStateSlice.reducer;
