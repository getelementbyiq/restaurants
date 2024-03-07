import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { setUserAll } from "../slices/userByIdSliceAll";

// Im getUserByIdAll Thunk
// Im getUserByIdAll Thunk
// Im getUserByIdAll Thunk
export const getUserByIdAll = createAsyncThunk(
  "user/getUserByIdAll",
  async (userId) => {
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

      const userData = results.flatMap((querySnapshot) => {
        return querySnapshot.docs.map((doc) => doc.data());
      });

      return userData;
    } catch (error) {
      console.error("Fehler beim Abrufen des Benutzers:", error);
      throw error; // Wiedergabe des Fehlers, um ihn im Aufrufer behandeln zu können
    }
  }
);
