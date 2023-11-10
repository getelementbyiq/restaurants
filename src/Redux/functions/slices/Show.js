// addStatusSlice.js
import { createSlice } from "@reduxjs/toolkit";

const showSlice = createSlice({
  name: "show",
  initialState: false, // Initialer Status auf "false"
  reducers: {
    setShow: (state, action) => {
      return action.payload;
    },
  },
});

export const { setShow } = showSlice.actions;

export default showSlice.reducer;
