import { AlbumModel } from "@/app/features/(drawer)/home/data/model/play_list_model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MusicState {
  list_music: AlbumModel[];
  current_music: AlbumModel | null;
  is_playing: boolean;
  current_time: number;
  duration: number;
}

const initialState: MusicState = {
  list_music: [],
  current_music: null,
  is_playing: false,
  current_time: 0,
  duration: 0,
};

const musicReducer = createSlice({
  name: "music",
  initialState,
  reducers: {
    setMusic: (state, action: PayloadAction<AlbumModel>) => {
      state.list_music.push(action.payload);
    },
    setCurrentMusic: (state, action: PayloadAction<AlbumModel>) => {
      state.current_music = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.is_playing = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.current_time = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setListMusic: (state, action: PayloadAction<AlbumModel[]>) => {
      state.list_music = action.payload;
    },
  },
});

export const {
  setMusic,
  setCurrentMusic,
  setIsPlaying,
  setCurrentTime,
  setDuration,
  setListMusic,
} = musicReducer.actions;
export default musicReducer.reducer;
