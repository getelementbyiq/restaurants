import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";

export const fetchRestaurantsData = createAsyncThunk(
  "fetchRestaurants/fetchRestaurantsData",
  async (userId, { dispatch }) => {
    try {
      const productsQuery = query(
        collection(db, "restaurants"),
        where("userId", "==", userId)
      );

      const querySnapshot = await getDocs(productsQuery);
      const restaurantsData = [];

      querySnapshot.forEach((doc) => {
        // Füge die Restaurant-Daten zusammen mit der Restaurant-ID zum Array hinzu
        restaurantsData.push({ id: doc.id, ...doc.data() });
      });
      return restaurantsData;
    } catch (error) {
      // Handle Fehler, z.B. Anzeigen einer Fehlermeldung
      console.error("Fehler beim Abrufen des Restaurant:", error);
    }
  }
);

const fetchRestaurantSlice = createSlice({
  name: "fetchRestaurants",
  initialState: {
    restaurantsData: null,
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantsData.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(fetchRestaurantsData.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.restaurantsData = action.payload;
        state.error = null;
      })
      .addCase(fetchRestaurantsData.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload;
      });
  },
});

// export const {} = fetchRestaurantSlice.actions;

export default fetchRestaurantSlice.reducer;
