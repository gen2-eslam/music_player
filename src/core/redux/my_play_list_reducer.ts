import { MyPlayListModel } from "@/app/features/(drawer)/playlist/model/my_play_list_model";
import { fetchMyPlayList } from "@/core/redux/my_play_list_thunk";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MyPlayListState {
  list_playlist: MyPlayListModel[];
  error: string | null;
  loading: boolean;
}

const initialState: MyPlayListState = {
  list_playlist: [],
  error: null,
  loading: false,
};

const myPlayListReducer = createSlice({
  name: "MyPlayList",
  initialState,
  reducers: {
    getMyPlayList: (state, action: PayloadAction<MyPlayListModel[]>) => {
      state.list_playlist = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMyPlayList.fulfilled, (state, action) => {
      state.list_playlist = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchMyPlayList.rejected, (state, action) => {
      state.list_playlist = [];
      state.loading = false;
      state.error = action.error.message ?? "Failed to fetch play list";
    });
    builder.addCase(fetchMyPlayList.pending, (state, action) => {
      state.list_playlist = [];
      state.loading = true;
      state.error = null;
    });
  },
});

export const { getMyPlayList  } = myPlayListReducer.actions;
export default myPlayListReducer.reducer;
