import { createSlice } from "@reduxjs/toolkit";

const storeSlice = createSlice({
  name: "store",
  initialState: {
    name: "",
    age: 0,
    showChatBot: false,
  },
  reducers: {
    addName(state, action) {
      state.name = action.payload;
    },
    addAge(state, action) {
      state.age = action.payload;
    },
    toggleChatBot(state, action) {
      state.showChatBot = action.payload;
    },
  },
});

export const { addName, addAge, toggleChatBot } = storeSlice.actions;

export default storeSlice.reducer;
