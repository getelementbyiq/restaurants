import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";

export const fetchProductsDataWithoutUser = createAsyncThunk(
  "fetchProducts/fetchProductsDataWithoutUser",
  async (_, { dispatch }) => {
    // Keine userID notwendig
    try {
      const productsQuery = collection(db, "products");

      const querySnapshot = await getDocs(productsQuery);
      const productsData = [];

      querySnapshot.forEach((doc) => {
        productsData.push(doc.data());
      });
      return productsData;
    } catch (error) {
      // Handle Fehler, z.B. Anzeigen einer Fehlermeldung
      console.error("Fehler beim Abrufen der Produkte:", error);
    }
  }
);

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
    productsDataWithoutUser: null,
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
        state.loading = "fulfilled";
        state.productsData = action.payload;
        state.error = null;
      })
      .addCase(fetchProductsData.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload;
      })
      .addCase(fetchProductsDataWithoutUser.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(fetchProductsDataWithoutUser.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.productsDataWithoutUser = action.payload;
        state.error = null;
      })
      .addCase(fetchProductsDataWithoutUser.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload;
      });
  },
});

export const { searchProducts } = fetchProductsSlice.actions;

export default fetchProductsSlice.reducer;
