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
  itemsData: {
    items: {},
  },
};

const createItemsList = createSlice({
  name: "createItemsList",
  initialState,
  reducers: {
    setItemsField: (state, action) => {
      const { field, value } = action.payload;
      state.itemsData[field] = value;
    },
    setItem: (state, action) => {
      const { itemsType, itemsData } = action.payload;
      state.productData.items[itemsType] = itemsData;
    },

    deleteItem: (state, action) => {
      const { itemsType, itemsName } = action.payload;
      delete state.productData.items[itemsType][itemsName];
    },

    reset: (state) => initialState,
  },
});

export const { setItemsField, setItem, deleteItem, reset } =
  createItemsList.actions;

export default createItemsList.reducer;
