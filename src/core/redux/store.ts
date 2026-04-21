// app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "./music_reducer";

export const store = configureStore({
  reducer: {
    music: musicReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
