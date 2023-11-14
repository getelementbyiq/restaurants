// createRestaurantSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { UserAuth } from "../../Auth/Auth";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../../firebase";
import { serverTimestamp } from "firebase/firestore";

const storage = getStorage();
const createdAt = serverTimestamp();

// Erstellen Sie eine Referenz auf den Speicherort, an dem Sie die Bilder speichern möchten (z.B. 'restaurants')
const imagesRef = ref(storage, "restaurants");

const initialState = {
  restaurantData: {
    name: "",
    logo: null,
    background: null,
    street: "",
    houseNumber: "",
    city: "",
    plz: "",
    art: "",
    followers: "",
    createdAt,
    userId: null,
    menu: {
      food: {},
      drinks: {},
    },
  },
};

const createLocalSlice = createSlice({
  name: "createRestaurant",
  initialState,
  reducers: {
    setRestaurantField: (state, action) => {
      const { field, value } = action.payload;
      state.restaurantData[field] = value;
    },
    setMenuCategory: (state, action) => {
      const { categoryType, categoryData } = action.payload;
      state.restaurantData.menu[categoryType] = categoryData;
    },

    deleteMenuCategory: (state, action) => {
      const { categoryType, categoryName } = action.payload;
      delete state.restaurantData.menu[categoryType][categoryName];
    },

    reset: (state) => initialState,
  },
});

export const {
  setRestaurantField,
  uploadImagesToFirestore,
  setMenuCategory,
  deleteMenuCategory,
  reset,
} = createLocalSlice.actions;

export default createLocalSlice.reducer;
