// addStatusSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuAddProduct: false,
  dealsState: "",
  saleDealValue: null,
};

const globalStateSlice = createSlice({
  name: "globalStates",
  initialState, // Initialer Status auf "false"
  reducers: {
    setMenuAddProduct: (state, action) => {
      state.menuAddProduct = action.payload;
    },
    setDealsState: (state, action) => {
      state.dealsState = action.payload;
    },
    setSaleDealValue: (state, action) => {
      state.saleDealValue = action.payload;
    },
  },
});

export const { setMenuAddProduct, setDealsState, setSaleDealValue } =
  globalStateSlice.actions;

export default globalStateSlice.reducer;
