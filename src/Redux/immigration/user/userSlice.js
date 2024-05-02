import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";

export const fetchUserData = createAsyncThunk(
  "fetchUser/fetchUserData",
  async (userId, { dispatch }) => {
    try {
      const usersQuery = query(
        collection(db, "users"),
        where("uid", "==", userId)
      );

      const usersOwnerQuery = query(
        collection(db, "usersOwner"),
        where("uid", "==", userId)
      );

      const results = await Promise.all([
        getDocs(usersQuery),
        getDocs(usersOwnerQuery),
      ]);

      const userData = [];

      results.forEach((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          userData.push(doc.data());
        });
      });
      const data = userData[0];
      return data;
    } catch (error) {
      // Handle Fehler, z.B. Anzeigen einer Fehlermeldung
      console.error("Fehler beim Abrufen des Benutzers:", error);
    }
  }
);

const fetchUserSlice = createSlice({
  name: "fetchUser",
  initialState: {
    userData: null,
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.userData = action.payload;
        state.error = null;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload;
      });
  },
});

export default fetchUserSlice.reducer;
