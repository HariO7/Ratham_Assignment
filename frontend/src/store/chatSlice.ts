import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    name: "",
    age: 0,
    showChatBot: false,
  },
  reducers: {
    addName(state, action) {
      state.name = action.payload;
      console.log("inserted name", state.name);
    },
    addAge(state, action) {
      state.age = action.payload;
      console.log("inserted age", state.age);
    },
    toggleChatBot(state, action) {
      state.showChatBot = action.payload;
    },
  },
});

export const { addName, addAge, toggleChatBot } = chatSlice.actions;

export default chatSlice.reducer;
