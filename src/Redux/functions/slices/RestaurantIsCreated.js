// addStatusSlice.js
import { createSlice } from "@reduxjs/toolkit";

const isCreatedSlice = createSlice({
  name: "isCreated",
  initialState: false, // Initialer Status auf "false"
  reducers: {
    setIsCreated: (state, action) => {
      return action.payload;
    },
  },
});

export const { setIsCreated } = isCreatedSlice.actions;

export default isCreatedSlice.reducer;
