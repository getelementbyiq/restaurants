// createRestaurantSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { UserAuth } from "../../Auth/Auth";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../../firebase";
import { serverTimestamp } from "firebase/firestore";

// Erstellen Sie eine Referenz auf den Speicherort, an dem Sie die Bilder speichern möchten (z.B. 'restaurants')

const initialState = {
  data: [], // Setze fetchProducts als leeres Array
};

const fetchProductsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    setFetchedRestaurants: (state, action) => {
      state.data = action.payload;
    },

    reset: (state) => initialState,
  },
});

export const { setFetchedRestaurants } = fetchProductsSlice.actions;

export default fetchProductsSlice.reducer;
