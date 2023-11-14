// addStatusSlice.js
import { createSlice } from "@reduxjs/toolkit";

const categoryDashSlice = createSlice({
  name: "categoryDash",
  initialState: {
    add: "add",
    settings: "settings",
    actions: "actions",
    active: "add",
  }, // Initialer Status auf "false"
  reducers: {
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

export const { setAddProductsActive, setSettingsActive, setActionsActive } =
  categoryDashSlice.actions;

export default categoryDashSlice.reducer;
