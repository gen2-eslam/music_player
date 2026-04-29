// app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "./music_reducer";
import myFavReducer from "./my_fav_reducer";
import myPlayListReducer from "./my_play_list_reducer";

export const store = configureStore({
  reducer: {
    music: musicReducer,
    myPlayList: myPlayListReducer,
    myFav: myFavReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
