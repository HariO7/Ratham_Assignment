import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./chatSlice";

const store = configureStore({
  reducer: { chatHandler: chatSlice },
});

export default store;
