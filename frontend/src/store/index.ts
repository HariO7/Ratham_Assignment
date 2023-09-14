import { configureStore } from "@reduxjs/toolkit";
import storeSlice from "./storeSlice";

const store = configureStore({
  reducer: { storeHandler: storeSlice },
});

export default store;
