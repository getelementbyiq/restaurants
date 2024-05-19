import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";

// export const fetchDealsData = createAsyncThunk(
//   "fetchDeals/fetchDealsData",
//   async (restaurantId, { dispatch }) => {
//     try {
//       const productsQuery = query(
//         collection(db, "deals"),
//         where("restaurantId", "==", restaurantId)
//       );

//       const querySnapshot = await getDocs(productsQuery);
//       const dealsData = [];

//       querySnapshot.forEach((doc) => {
//         // Füge die Restaurant-Daten zusammen mit der Restaurant-ID zum Array hinzu
//         dealsData.push({ id: doc.id, ...doc.data() });
//       });
//       return dealsData;
//     } catch (error) {
//       // Handle Fehler, z.B. Anzeigen einer Fehlermeldung
//       console.error("Fehler beim Abrufen des Deals:", error);
//     }
//   }
// );

export const fetchMenusRealTimeData = createAsyncThunk(
  "fetchRealTimeMenus/fetchMenusRealTimeData",
  async (restaurantId, { dispatch }) => {
    try {
      const productsQuery = query(
        collection(db, "menus"),
        where("restaurantId", "==", restaurantId)
      );

      const unsubscribe = onSnapshot(productsQuery, (snapshot) => {
        const dealsData = [];
        snapshot.forEach((doc) => {
          dealsData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setMenusData(dealsData));
      });

      // Unsubscribe-Funktion zurückgeben, um den Listener bei Bedarf zu stoppen
      return unsubscribe;
    } catch (error) {
      // Handle Fehler, z.B. Anzeigen einer Fehlermeldung
      console.error("Fehler beim Abrufen des Deals:", error);
    }
  }
);

// Action Creator zum Setzen der Deals-Daten im Redux-Store
export const setMenusData = (dealsData) => ({
  type: "fetchRealTimeMenus/setDealsData",
  payload: dealsData,
});

const RealTimeMenusOfRestaurantSlice = createSlice({
  name: "fetchRealTimeMenus",
  initialState: {
    menusData: null,
    loading: "",
    error: null,
  },
  reducers: {
    setDealsData: (state, action) => {
      state.menusData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenusRealTimeData.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(fetchMenusRealTimeData.fulfilled, (state) => {
        state.loading = "fulfilled";
        state.error = null;
      })
      // .addCase(fetchMenusRealTimeData.fulfilled, (state, action) => {
      //   state.loading = "fulfilled";
      //   state.dealsData = action.payload;
      //   state.error = null;
      // })
      .addCase(fetchMenusRealTimeData.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload;
      });
  },
});

// export const {} = dealsOfRestaurantSlice.actions;

export default RealTimeMenusOfRestaurantSlice.reducer;
