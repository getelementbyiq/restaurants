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
    offerStart: null,
    offerEnd: null,
    eventsDate: null,
    collectedOfferTime: null,
    menuDefault: null,
    menuDeals: [],
    tag: null,
    // menus: {
    //   default: null,
    //   deals: null,
    // },
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
    setEventsDate: (state, action) => {
      // Überprüfen, ob der Zeittyp gültig ist und dann den Wert setzen
      state.productData.eventsDate = action.payload;
    },
    setOfferStart: (state, action) => {
      // Überprüfen, ob der Zeittyp gültig ist und dann den Wert setzen
      state.productData.offerStart = action.payload;
    },
    setOfferEnd: (state, action) => {
      // Überprüfen, ob der Zeittyp gültig ist und dann den Wert setzen
      state.productData.offerEnd = action.payload;
    },
    collectedOfferTime: (state, action) => {
      // Überprüfen, ob der Zeittyp gültig ist und dann den Wert setzen
      state.productData.offerStart = [
        ...state.productData.offerStart,
        action.payload,
      ];
    },

    resetCreateProduct: (state) => initialState,
  },
});

export const {
  setProductField,
  setItem,
  deleteItem,
  resetCreateProduct,
  setOfferStart,
  setOfferEnd,
  collectedOfferTime,
  setEventsDate,
} = createProductSlice.actions;

export default createProductSlice.reducer;
