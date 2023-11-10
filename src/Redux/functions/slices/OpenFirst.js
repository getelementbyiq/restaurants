// addStatusSlice.js
import { createSlice } from "@reduxjs/toolkit";

const openFirstSlice = createSlice({
  name: "openFrist",
  initialState: false, // Initialer Status auf "false"
  reducers: {
    setOpenFirst: (state, action) => {
      return action.payload;
    },
  },
});

export const { setOpenFirst } = openFirstSlice.actions;

export default openFirstSlice.reducer;
