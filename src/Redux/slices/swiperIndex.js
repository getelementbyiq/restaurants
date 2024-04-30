// createRestaurantSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { UserAuth } from "../../Auth/Auth";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../../firebase";
import { serverTimestamp } from "firebase/firestore";

// Erstellen Sie eine Referenz auf den Speicherort, an dem Sie die Bilder speichern möchten (z.B. 'restaurants')

const swiperIndexSlice = createSlice({
  name: "swiperIndex",
  initialState: null,
  reducers: {
    setSwiperIndex: (state, action) => {
      // Überprüfe, ob der übergebene Wert dem initialState entspricht
      return action.payload;
    },
    resetSwiperIndex: (state) => null,
  },
});

export const { setSwiperIndex, resetSwiperIndex } = swiperIndexSlice.actions;

export default swiperIndexSlice.reducer;
