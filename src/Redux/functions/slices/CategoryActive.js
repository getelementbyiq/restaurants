// addStatusSlice.js
import { createSlice } from "@reduxjs/toolkit";

const categoryActiveSlice = createSlice({
  name: "categoryActive",
  initialState: {
    food: "food",
    drinks: "drinks",
    categoryActive: "food", // Hier füge ich 'categoryActive' direkt hinzu
  },
  reducers: {
    setCategoryActive: (state, action) => {
      state.categoryActive =
        action.payload === "food" ? state.food : state.drinks; // Hier wird der Wert von 'categoryActive' basierend auf 'action.payload' aktualisiert
    },
  },
});

export const { setCategoryActive } = categoryActiveSlice.actions;

export default categoryActiveSlice.reducer;
