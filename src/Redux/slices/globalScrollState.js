// createRestaurantSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { UserAuth } from "../../Auth/Auth";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../../firebase";
import { serverTimestamp } from "firebase/firestore";

// Erstellen Sie eine Referenz auf den Speicherort, an dem Sie die Bilder speichern möchten (z.B. 'restaurants')

const globalScrollState = createSlice({
  name: "scrollState",
  initialState: false,
  reducers: {
    setScrolled: (state, action) => {
      // Überprüfe, ob der übergebene Wert dem initialState entspricht
      return action.payload;
    },
    resetScrolled: (state) => false,
  },
});

export const { setScrolled, resetScrolled } = globalScrollState.actions;

export default globalScrollState.reducer;
