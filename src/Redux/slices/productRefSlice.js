// Redux-Slice für Produkt-Ref: productRefSlice.js

import { createSlice } from "@reduxjs/toolkit";

export const productRefSlice = createSlice({
  name: "productRef",
  initialState: {
    ref: null,
  },
  reducers: {
    setProductRef: (state, action) => {
      state.ref = action.payload;
    },
  },
});

export const { setProductRef } = productRefSlice.actions;

export const selectProductRef = (state) => state.productRef.ref;

export default productRefSlice.reducer;
