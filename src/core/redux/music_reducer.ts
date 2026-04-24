import { AlbumModel } from "@/app/features/(drawer)/home/data/model/play_list_model";
import { LocalDataKeys } from "@/core/service/local_data_base/local_data_keys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AudioSource, createAudioPlayer } from "expo-audio";

interface MusicState {
  list_music: AlbumModel[];
  current_music: AlbumModel | null;
  currentMusicIndex: number;
  has_next: boolean;
  has_previous: boolean;
  isSmall: boolean;
  token: string | null;
  source: AudioSource | null;
  player: any | null;
}

const initialState: MusicState = {
  list_music: [],
  current_music: null,
  currentMusicIndex: 0,
  has_next: false,
  has_previous: false,
  isSmall: true,
  token: null,
  source: null,
  player: createAudioPlayer(),
};

export const fetchToken = createAsyncThunk("music/fetchToken", async () => {
  const storedToken = await AsyncStorage.getItem(LocalDataKeys.accessToken);
  return storedToken;
});

const getSource = (
  currentMusic: AlbumModel | null,
  token: string | null,
): AudioSource | null => {
  if (!currentMusic?.stream_url) return null;

  const url = Array.isArray(currentMusic.stream_url)
    ? currentMusic.stream_url[0]
    : currentMusic.stream_url;

  const safeUrl = url.startsWith("http://")
    ? url.replace("http://", "https://")
    : url;

  const headers: Record<string, string> = {
    "Content-Type": "audio/mpeg",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return {
    uri: safeUrl,
    headers,
  };
};

const musicReducer = createSlice({
  name: "music",
  initialState,
  reducers: {
    setIsSmall: (state, action: PayloadAction<boolean>) => {
      state.isSmall = action.payload;
    },
    setPlayer: (state, action: PayloadAction<any>) => {
      state.player = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      state.source = getSource(state.current_music, state.token);
    },
    setListMusic: (state, action: PayloadAction<AlbumModel[]>) => {
      state.list_music = action.payload;
      if (action.payload.length > 0) {
        state.current_music = action.payload[0];
        state.currentMusicIndex = 0;
        state.has_next = action.payload.length > 1;
        state.has_previous = false;
        state.source = getSource(state.current_music, state.token);
      }
    },
    setCurrentMusicIndex: (
      state,
      action: PayloadAction<{ index: number; list_music: AlbumModel[] }>,
    ) => {
      if (
        action.payload.index >= 0 &&
        action.payload.index < action.payload.list_music.length
      ) {
        state.list_music = action.payload.list_music;
        state.current_music = action.payload.list_music[action.payload.index];
        state.currentMusicIndex = action.payload.index;
        state.has_next =
          action.payload.index < action.payload.list_music.length - 1;
        state.has_previous = action.payload.index > 0;
        state.source = getSource(state.current_music, state.token);
      }
    },
    nextMusic: (state) => {
      if (state.has_next) {
        state.currentMusicIndex++;
        state.current_music = state.list_music[state.currentMusicIndex];
        state.has_next = state.currentMusicIndex < state.list_music.length - 1;
        state.has_previous = state.currentMusicIndex > 0;
        state.source = getSource(state.current_music, state.token);
      }
    },
    previousMusic: (state) => {
      if (state.has_previous) {
        state.currentMusicIndex--;
        state.current_music = state.list_music[state.currentMusicIndex];
        state.has_next = state.currentMusicIndex < state.list_music.length - 1;
        state.has_previous = state.currentMusicIndex > 0;
        state.source = getSource(state.current_music, state.token);
      }
    },
    setCurrentMusic: (state, action: PayloadAction<AlbumModel>) => {
      state.current_music = action.payload;
      state.source = getSource(state.current_music, state.token);

      const index = state.list_music.findIndex(
        (m) => m.id === action.payload.id,
      );
      if (index !== -1) {
        state.currentMusicIndex = index;
        state.has_next = index < state.list_music.length - 1;
        state.has_previous = index > 0;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      state.token = action.payload;
      state.source = getSource(state.current_music, state.token);
    });
  },
});

export const {
  setIsSmall,
  setPlayer,
  setToken,
  setListMusic,
  setCurrentMusicIndex,
  setCurrentMusic,
  nextMusic,
  previousMusic,
} = musicReducer.actions;
export default musicReducer.reducer;
