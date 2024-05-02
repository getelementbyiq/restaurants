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
  productData: {
    name: null,
    price: null,
    description: null,
    comments: null,
    likes: null,
    background: null,
    createdAt,
    restaurantsId: null,
    items: {},
    offerTime: {
      default: null,
      collected: null,
    },
    menus: {
      default: null,
      deals: null,
    },
    tag: null,
  },
};

const createProductSlice = createSlice({
  name: "createProduct",
  initialState,
  reducers: {
    setProductField: (state, action) => {
      const { field, value } = action.payload;
      state.productData[field] = value;
    },
    setItem: (state, action) => {
      const { itemsType, itemsData } = action.payload;
      state.productData.items[itemsType] = itemsData;
    },

    deleteItem: (state, action) => {
      const { itemsName } = action.payload;

      // Überprüfen, ob die Eigenschaft vorhanden ist, und dann löschen
      if (state.productData.items.hasOwnProperty(itemsName)) {
        delete state.productData.items[itemsName];
      }
    },
    setOfferTime: (state, action) => {
      const { timeType, timeValue } = action.payload;

      // Überprüfen, ob der Zeittyp gültig ist und dann den Wert setzen
      if (timeType === "default" || timeType === "collected") {
        state.productData.offerTime[timeType] = timeValue;
      }
    },

    resetCreateProduct: (state) => initialState,
  },
});

export const {
  setProductField,
  setItem,
  deleteItem,
  resetCreateProduct,
  setOfferTime,
} = createProductSlice.actions;

export default createProductSlice.reducer;
