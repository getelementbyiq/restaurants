import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";

export const fetchMenusData = createAsyncThunk(
  "fetchMenus/fetchMenusData",
  async (restaurantId, { dispatch }) => {
    try {
      const productsQuery = query(
        collection(db, "menus"),
        where("restaurantId", "==", restaurantId)
      );

      const querySnapshot = await getDocs(productsQuery);
      const menusData = [];

      querySnapshot.forEach((doc) => {
        // Füge die Restaurant-Daten zusammen mit der Restaurant-ID zum Array hinzu
        menusData.push({ id: doc.id, ...doc.data() });
      });
      return menusData;
    } catch (error) {
      // Handle Fehler, z.B. Anzeigen einer Fehlermeldung
      console.error("Fehler beim Abrufen des Menu:", error);
    }
  }
);



const menusOfRestaurantSlice = createSlice({
  name: "fetchMenus",
  initialState: {
    menusData: null,
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenusData.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(fetchMenusData.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.menusData = action.payload;
        state.error = null;
      })
      .addCase(fetchMenusData.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload;
      });
  },
});

// export const {} = menusOfRestaurantSlice.actions;

export default menusOfRestaurantSlice.reducer;
