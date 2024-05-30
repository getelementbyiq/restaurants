import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../../firebase";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";

// Fetch function
export const fetchViralProducts = async (startAfterDocument) => {
  const productsRef = collection(db, "products");
  let q = query(
    productsRef,
    orderBy("price", "desc"),
    orderBy("likes", "desc"),
    limit(5)
  );

  if (startAfterDocument) {
    q = query(q, startAfter(startAfterDocument));
  }

  const snapshot = await getDocs(q);
  console.log("pagination", snapshot.docs);

  return {
    products: snapshot.docs.map((doc) => doc.data()),
    lastDocument: snapshot.docs[snapshot.docs.length - 1] || null,
    hasMore: snapshot.docs.length === 6,
  };
};

// Thunk action
export const fetchViralProductsAsync = createAsyncThunk(
  "viralProducts/fetchViralProducts",
  async (startAfterDocument, { rejectWithValue }) => {
    try {
      return await fetchViralProducts(startAfterDocument);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  data: [],
  lastDocument: null,
  hasMore: true,
  loading: false,
  error: null,
};

// Slice
const viralProductsSlice = createSlice({
  name: "viralProducts",
  initialState,
  reducers: {
    resetViralProducts: (state) => {
      state.data = [];
      state.lastDocument = null;
      state.hasMore = true;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchViralProductsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchViralProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [...state.data, ...action.payload.products];
        state.lastDocument = action.payload.lastDocument;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchViralProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { resetViralProducts } = viralProductsSlice.actions;

export const selectViralProducts = (state) => state.viralProducts.data;
export const selectViralLoading = (state) => state.viralProducts.loading;
export const selectViralError = (state) => state.viralProducts.error;

export default viralProductsSlice.reducer;
