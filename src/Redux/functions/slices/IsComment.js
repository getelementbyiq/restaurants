// addStatusSlice.js
import { createSlice } from "@reduxjs/toolkit";

const isCommentSlice = createSlice({
  name: "isComment",
  initialState: false, // Initialer Status auf "false"
  reducers: {
    setIsComment: (state, action) => {
      return action.payload;
    },
  },
});

export const { setIsComment } = isCommentSlice.actions;

export default isCommentSlice.reducer;
