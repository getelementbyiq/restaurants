// createRestaurantSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { UserAuth } from "../../Auth/Auth";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../../firebase";
import { serverTimestamp } from "firebase/firestore";

// Erstellen Sie eine Referenz auf den Speicherort, an dem Sie die Bilder speichern möchten (z.B. 'restaurants')

const restaurantDataFromMain = createSlice({
  name: "restaurantDataFromMain",
  initialState: null,
  reducers: {
    setRestaurantDataFromMain: (state, action) => {
      // Überprüfe, ob der übergebene Wert dem initialState entspricht
      return action.payload;
    },
    resetRestaurantDataFromMain: (state) => null,
  },
});

export const { setRestaurantDataFromMain, resetRestaurantDataFromMain } =
  restaurantDataFromMain.actions;

export default restaurantDataFromMain.reducer;
