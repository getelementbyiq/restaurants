// addStatusSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuAddProduct: false,
};

const globalStateSlice = createSlice({
  name: "globalStates",
  initialState, // Initialer Status auf "false"
  reducers: {
    setMenuAddProduct: (state, action) => {
      state.menuAddProduct = action.payload;
    },
  },
});

export const { setMenuAddProduct } = globalStateSlice.actions;

export default globalStateSlice.reducer;
