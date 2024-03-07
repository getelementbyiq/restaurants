// addStatusSlice.js
import { createSlice } from "@reduxjs/toolkit";

const categoryDashSlice = createSlice({
  name: "categoryDash",
  initialState: {
    all: "all",
    add: "add",
    settings: "settings",
    actions: "actions",
    active: "alls",
  }, // Initialer Status auf "false"
  reducers: {
    setAllProductsActive: (state, action) => {
      state.active = action.payload;
    },
    setAddProductsActive: (state, action) => {
      state.active = "add";
    },
    setSettingsActive: (state, action) => {
      state.active = "settings";
    },
    setActionsActive: (state, action) => {
      state.active = "actions";
    },
  },
});

export const {
  setAllProductsActive,
  setAddProductsActive,
  setSettingsActive,
  setActionsActive,
} = categoryDashSlice.actions;

export default categoryDashSlice.reducer;
