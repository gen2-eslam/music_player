import { AlbumModel } from "@/app/features/(drawer)/home/data/model/play_list_model";
import { LocalDataKeys } from "@/core/service/local_data_base/local_data_keys";
import { axiosGetData, axiosPostData } from "@/core/service/networking/axios";
import { EndPoint } from "@/core/service/networking/end_point";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
interface MyFavState {
  list_favorite: AlbumModel[];
}

const initialState: MyFavState = {
  list_favorite: [],
};
const fetchMyFavoriteTracks = async () => {
  const response = await axiosGetData<AlbumModel[]>({
    url: EndPoint.liked,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await AsyncStorage.getItem(LocalDataKeys.accessToken)}`,
    },
  });
  return response?.data || [];
};

export const getMyFavoriteTracks = createAsyncThunk(
  "myFav/getMyFavoriteTracks",
  async () => {
    const response = await fetchMyFavoriteTracks();
    return response;
  },
);

export const addFavoriteTrack = createAsyncThunk(
  "myFav/addFavoriteTrack",
  async (id: string) => {
    await axiosPostData({
      url: EndPoint.tracks_id_like(id),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem(LocalDataKeys.accessToken)}`,
      },
    });
    return id;
  },
);

const myFavReducer = createSlice({
  name: "MyFav",
  initialState,
  reducers: {
    getMyFav: (state, action: PayloadAction<AlbumModel[]>) => {
      state.list_favorite = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyFavoriteTracks.fulfilled, (state, action) => {
      state.list_favorite = action.payload;
    });
    builder.addCase(addFavoriteTrack.fulfilled, (state, action) => {
    });
  },
});

export const { getMyFav } = myFavReducer.actions;
export default myFavReducer.reducer;
