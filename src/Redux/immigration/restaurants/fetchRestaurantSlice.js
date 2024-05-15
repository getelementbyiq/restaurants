import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

// Thunk erstellen, um Restaurants für einen bestimmten Benutzer abzurufen

export const fetchUserRestaurants = createAsyncThunk(
  "restaurants/fetchUserRestaurants",
  async (userId, thunkAPI) => {
    try {
      const q = query(
        collection(db, "restaurants"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      console.log("restaurantsOfUser", querySnapshot);
      const userRestaurants = [];
      querySnapshot.forEach((doc) => {
        const restaurantData = { id: doc.id, ...doc.data() };
        userRestaurants.push(restaurantData);
      });

      return userRestaurants;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Slice erstellen, um den Zustand der Restaurants und den asynchronen Thunk zu verwalten
const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState: {
    userRestaurants: [],
    restaurantsProducts: [],
    restaurantsMenus: [],
    restaurantsId: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setRestaurantsId(state, action) {
      state.restaurantsId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRestaurants.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserRestaurants.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userRestaurants = action.payload;
      })
      .addCase(fetchUserRestaurants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default restaurantsSlice.reducer;
