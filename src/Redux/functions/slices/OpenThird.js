// addStatusSlice.js
import { createSlice } from "@reduxjs/toolkit";

const openThirdSlice = createSlice({
  name: "openThird",
  initialState: false, // Initialer Status auf "false"
  reducers: {
    setOpenThird: (state, action) => {
      return action.payload;
    },
  },
});

export const { setOpenThird } = openThirdSlice.actions;

export default openThirdSlice.reducer;
