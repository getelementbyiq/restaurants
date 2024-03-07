// addStatusSlice.js
import { createSlice } from "@reduxjs/toolkit";

const settingsProductSlice = createSlice({
  name: "settingsProduct",
  initialState: false, // Initialer Status auf "false"
  reducers: {
    setSettingsProduct: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSettingsProduct } = settingsProductSlice.actions;

export default settingsProductSlice.reducer;
