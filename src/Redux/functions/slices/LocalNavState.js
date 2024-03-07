// addStatusSlice.js
import { createSlice } from "@reduxjs/toolkit";

const localNavStateSlice = createSlice({
  name: "localNavState",
  initialState: "home",
  reducers: {
    setLocalNavState: (state, action) => {
      return action.payload;
    },
  },
});

export const { setLocalNavState } = localNavStateSlice.actions;

export default localNavStateSlice.reducer;
