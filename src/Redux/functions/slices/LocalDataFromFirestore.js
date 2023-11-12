// addStatusSlice.js
import { createSlice } from "@reduxjs/toolkit";

const localDataSlice = createSlice({
  name: "localData",
  initialState: false, // Initialer Status auf "false"
  reducers: {
    setLocalData: (state, action) => {
      return action.payload;
    },
  },
});

export const { setLocalData } = localDataSlice.actions;

export default localDataSlice.reducer;
