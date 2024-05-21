// addStatusSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuAddProduct: false,
  dealsState: "",
  saleDealValue: null,
  categoryList: [
    { name: "dashboard", color: "#00D1FF" },
    { name: "combi", color: "#00D1FF" },
    { name: "calssic", color: "#FF00D6" },
    { name: "sale", color: "#00FFC2" },
    { name: "daysplan", color: "#9EFF00" },
    { name: "weekly", color: "#9EFF00" },
    { name: "others", color: "#9EFF00" },
  ],
  productsTypeList: [
    { name: "dashboard", color: "#00D1FF" },
    { name: "food", color: "#00D1FF" },
    { name: "drink", color: "#FF00D6" },
    { name: "dip", color: "#00FFC2" },
    { name: "dressing", color: "#9EFF00" },
    { name: "event", color: "#9EFF00" },
    { name: "others", color: "#9EFF00" },
  ],
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
