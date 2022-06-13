// import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import updateReducer from "../Slices/updateSlice";

export const store = configureStore({
  reducer: {
    updater: updateReducer,
  },
});

export default store;
