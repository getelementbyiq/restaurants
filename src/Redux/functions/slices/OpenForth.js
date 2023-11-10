// addStatusSlice.js
import { createSlice } from "@reduxjs/toolkit";

const openForthSlice = createSlice({
  name: "openThird",
  initialState: false, // Initialer Status auf "false"
  reducers: {
    setOpenForth: (state, action) => {
      return action.payload;
    },
  },
});

export const { setOpenForth } = openForthSlice.actions;

export default openForthSlice.reducer;
