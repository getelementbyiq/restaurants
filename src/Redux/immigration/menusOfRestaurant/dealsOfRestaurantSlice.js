import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";

export const fetchDealsData = createAsyncThunk(
  "fetchDeals/fetchDealsData",
  async (restaurantId, { dispatch }) => {
    try {
      const productsQuery = query(
        collection(db, "deals"),
        where("restaurantId", "==", restaurantId)
      );

      const querySnapshot = await getDocs(productsQuery);
      const dealsData = [];

      querySnapshot.forEach((doc) => {
        // Füge die Restaurant-Daten zusammen mit der Restaurant-ID zum Array hinzu
        dealsData.push({ id: doc.id, ...doc.data() });
      });
      return dealsData;
    } catch (error) {
      // Handle Fehler, z.B. Anzeigen einer Fehlermeldung
      console.error("Fehler beim Abrufen des Deals:", error);
    }
  }
);

const dealsOfRestaurantSlice = createSlice({
  name: "fetchDeals",
  initialState: {
    dealsData: null,
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDealsData.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(fetchDealsData.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.dealsData = action.payload;
        state.error = null;
      })
      .addCase(fetchDealsData.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload;
      });
  },
});

// export const {} = dealsOfRestaurantSlice.actions;

export default dealsOfRestaurantSlice.reducer;
