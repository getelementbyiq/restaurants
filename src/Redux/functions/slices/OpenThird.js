// addStatusSlice.js
import { createSlice } from "@reduxjs/toolkit";

const searchResultSlice = createSlice({
  name: "searchResult",
  initialState: false, // Initialer Status auf "false"
  reducers: {
    setSearchResult: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSearchResult } = searchResultSlice.actions;

export default searchResultSlice.reducer;
