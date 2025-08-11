// lib/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import cycleReducer from "./slices/cycleSlice";

export const store = configureStore({
  reducer: {
    cycles: cycleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
