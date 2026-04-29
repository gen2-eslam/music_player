import {
  MyPlayListModel,
  MyPlayListModelResponse,
} from "@/app/features/(drawer)/playlist/model/my_play_list_model";
import { LocalDataKeys } from "@/core/service/local_data_base/local_data_keys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  axiosDeleteData,
  axiosGetData,
  axiosPostData,
  axiosPutData,
} from "../../core/service/networking/axios";
import { EndPoint } from "../../core/service/networking/end_point";
export const fetchMyPlayList = createAsyncThunk(
  "my_play_list/fetchMyPlayList",

  async (_, thunkAPI) => {
    const token = await AsyncStorage.getItem(LocalDataKeys.accessToken);
    const response = await axiosGetData<MyPlayListModelResponse[]>({
      url: EndPoint.playlist,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const secondFetchPlayList: MyPlayListModel[] = [];
    for (const item of response.data) {
      console.log("itemssss", item);
      await axiosGetData<MyPlayListModel>({
        url: EndPoint.playlist_id(item.id.toString()),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        secondFetchPlayList.push(res.data);
      });
    }
    console.log("secondFetchPlayList", secondFetchPlayList);

    return secondFetchPlayList;
  },
);

export const createPlaylist = createAsyncThunk(
  "my_play_list/createPlaylist",
  async ({ name, description }: { name: string; description: string }) => {
    const token = await AsyncStorage.getItem(LocalDataKeys.accessToken);
    const response = await axiosPostData<{
      data: MyPlayListModel;
    }>({
      url: EndPoint.playlist,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: name,
        description: description,
      },
    });
    return response.data;
  },
);

export const addTrackToPlaylist = createAsyncThunk(
  "my_play_list/addTrackToPlaylist",
  async ({ playlistId, trackId }: { playlistId: string; trackId: string }) => {
    const token = await AsyncStorage.getItem(LocalDataKeys.accessToken);
    const response = await axiosPostData<{
      data: MyPlayListModel;
    }>({
      url: EndPoint.playlist_id_add_track(playlistId),
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        track_id: trackId,
      },
    });
    return response.data;
  },
);

export const removeFromPlaylist = createAsyncThunk(
  "my_play_list/removeFromPlaylist",
  async ({ trackId }: { trackId: string }) => {
    const token = await AsyncStorage.getItem(LocalDataKeys.accessToken);
    const response = await axiosDeleteData<{
      data: MyPlayListModel;
    }>({
      url: EndPoint.playlist_id_remove_track(trackId),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
);

export const updatePlaylist = createAsyncThunk(
  "my_play_list/updatePlaylist",
  async ({
    playlistId,
    name,
    description,
  }: {
    playlistId: string;
    name: string;
    description: string;
  }) => {
    const token = await AsyncStorage.getItem(LocalDataKeys.accessToken);
    const response = await axiosPutData<{
      data: MyPlayListModel;
    }>({
      url: EndPoint.playlist_id(playlistId),
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: name,
        description: description,
      },
    });
    return response.data;
  },
);

export const deletePlaylist = createAsyncThunk(
  "my_play_list/deletePlaylist",
  async (playlistId: string) => {
    const token = await AsyncStorage.getItem(LocalDataKeys.accessToken);
    const response = await axiosDeleteData<{
      data: MyPlayListModel;
    }>({
      url: EndPoint.playlist_id(playlistId),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
);
