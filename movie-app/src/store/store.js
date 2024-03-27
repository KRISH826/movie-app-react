/** @format */
import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./slices/HomeSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
  },
});
