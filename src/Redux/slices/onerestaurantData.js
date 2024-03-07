// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurantData: [],
  menuData: [],
  productsData: [],
  restaurantId: null,
  menuId: null,
  foodId: null,
  categoryType: null,
};

const oneRestaurantSlice = createSlice({
  name: "oneRestaurantData",
  initialState,
  reducers: {
    setRestaurantData: (state, action) => {
      state.restaurantData = action.payload;
    },
    setMenuData: (state, action) => {
      state.menuData = action.payload;
    },
    setProductsData: (state, action) => {
      state.productsData = action.payload;
    },
    setRestaurantId: (state, action) => {
      state.restaurantId = action.payload;
    },
    setMenuId: (state, action) => {
      state.menuId = action.payload;
    },
    setFoodId: (state, action) => {
      state.foodId = action.payload;
    },
    setCategoryType: (state, action) => {
      state.categoryType = action.payload;
    },
  },
});

export const {
  setRestaurantData,
  setMenuData,
  setRestaurantId,
  setMenuId,
  setFoodId,
  setCategoryType,
  setProductsData,
} = oneRestaurantSlice.actions;

export default oneRestaurantSlice.reducer;
