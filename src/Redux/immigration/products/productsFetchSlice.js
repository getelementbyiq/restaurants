import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";

export const fetchProductsData = createAsyncThunk(
  "fetchProducts/fetchProductsData",
  async (userId, { dispatch }) => {
    try {
      const productsQuery = query(
        collection(db, "products"),
        where("restaurantsId", "==", userId)
      );

      const querySnapshot = await getDocs(productsQuery);
      const productsData = [];

      querySnapshot.forEach((doc) => {
        productsData.push(doc.data());
      });
      return productsData;
    } catch (error) {
      // Handle Fehler, z.B. Anzeigen einer Fehlermeldung
      console.error("Fehler beim Abrufen des Products:", error);
    }
  }
);

const fetchProductsSlice = createSlice({
  name: "productsFetchSlice",
  initialState: {
    productsData: null,
    loading: "",
    error: null,
    searchResults: [],
  },
  reducers: {
    searchProducts: (state, action) => {
      const { searchTerm } = action.payload;
      const results = state.productsData.filter((product) =>
        Object.values(product).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      state.searchResults = results;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsData.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(fetchProductsData.fulfilled, (state, action) => {
        console.log("Action payload:", action.payload);
        state.loading = "fulfilled";
        state.productsData = action.payload;
        state.error = null;
      })
      .addCase(fetchProductsData.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload;
      });
  },
});

export const { searchProducts } = fetchProductsSlice.actions;

export default fetchProductsSlice.reducer;
