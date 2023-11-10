// createRestaurantSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { UserAuth } from "../../Auth/Auth";
const { user } = UserAuth;
const userId = user.uid;
const initialState = {
  restaurantData: {
    name: "",
    logo: null,
    background: null,
    address: {
      street: "",
      houseNumber: "",
      city: "",
      country: "",
      lat: null,
      long: null,
    },
    art: "",
    uid: userId,
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
    reset: (state) => initialState, // Aktion zum Zurücksetzen des States
  },
});

export const { setRestaurantField, reset } = createLocalSlice.actions;

export default createLocalSlice.reducer;
