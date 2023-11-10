// addStatusSlice.js
import { createSlice } from "@reduxjs/toolkit";

const openSecondSlice = createSlice({
  name: "openSecond",
  initialState: false, // Initialer Status auf "false"
  reducers: {
    setOpenSecond: (state, action) => {
      return action.payload;
    },
  },
});

export const { setOpenSecond } = openSecondSlice.actions;

export default openSecondSlice.reducer;
