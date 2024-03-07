// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userAllSlice = createSlice({
  name: "userAll",
  initialState: {
    user: null, // Hier kannst du die Benutzerdaten speichern
    isAuthenticated: false,
  },
  reducers: {
    setUserAll: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserAll } = userAllSlice.actions;

export default userAllSlice.reducer;
