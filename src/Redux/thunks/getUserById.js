import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { setUser } from "../slices/userByIdSlice";

export const getUserById = createAsyncThunk(
  "user/getUserById",
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

      userData.forEach((data) => {
        dispatch(setUser(data));
      });
    } catch (error) {
      // Handle Fehler, z.B. Anzeigen einer Fehlermeldung
      console.error("Fehler beim Abrufen des Benutzers:", error);
    }
  }
);
