// productsAPI.js
import "firebase/firestore";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../../firebase";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { timeToNumericFormat } from "../../../Components/AAATimeToNum/TimeToNum";

export const fetchProducts = async (currentTime, startAfterDocument) => {
  const productsRef = collection(db, "products");
  let q = query(
    productsRef,
    where("offerStart", "<=", timeToNumericFormat(currentTime)),
    where("offerEnd", ">=", timeToNumericFormat(currentTime)),
    // orderBy("offerStart")
    limit(3)
  );
  const snapshot2 = await getDocs(q);
  console.log("pagination", snapshot2.docs, timeToNumericFormat(currentTime));

  if (startAfterDocument) {
    q = startAfter(q, startAfterDocument);
  }

  const snapshot = await getDocs(q);
  console.log("pagination", snapshot.docs);

  return {
    products: snapshot.docs.map((doc) => doc.data()),
    lastDocument: snapshot.docs[snapshot.docs.length - 1] || null,
    hasMore: snapshot.docs.length === 1,
  };
};

const initialState = {
  productsList: [],
  lastDocument: null,
  hasMore: true,
  loading: false,
  error: null,
  viralProducts: {
    data: null,
    lastDocument: null,
    hasMore: true,
    loading: false,
    error: null,
  },
};

export const productsForMainSlice = createSlice({
  name: "productsForMain",
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.productsList = [...state.productsList, ...action.payload.products];
      state.lastDocument = action.payload.lastDocument;
      state.hasMore = action.payload.hasMore;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetProducts: (state) => {
      state.productsList = [];
      state.lastDocument = null;
      state.hasMore = true;
      state.loading = false;
      state.error = null;
    },
    setLastDocumentViral: (state, action) => {
      state.viralProducts.lastDocument = action.payload;
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  resetProducts,
} = productsForMainSlice.actions;

export const fetchProductsAsync =
  (currentTime, startAfterDocument) => async (dispatch) => {
    console.log("fetchProduct", currentTime, startAfterDocument);
    dispatch(fetchProductsStart());
    try {
      const response = await fetchProducts(currentTime, startAfterDocument);
      console.log("response", response);
      dispatch(fetchProductsSuccess(response));
    } catch (error) {
      dispatch(fetchProductsFailure(error.message));
    }
  };

export const selectProducts = (state) => state.products.productsList;
export const selectLoading = (state) => state.products.loading;
export const selectError = (state) => state.products.error;
export const selectViralProducts = (state) =>
  state.productsForMain.viralProducts.data;
export const selectViralLoading = (state) =>
  state.productsForMain.viralProducts.loading;
export const selectViralError = (state) =>
  state.productsForMain.viralProducts.error;

export default productsForMainSlice.reducer;
