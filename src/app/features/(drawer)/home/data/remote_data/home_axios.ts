import { LocalDataKeys } from "@/core/service/local_data_base/local_data_keys";
import { axiosGetData } from "@/core/service/networking/axios";
import { EndPoint } from "@/core/service/networking/end_point";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AlbumModel } from "../model/play_list_model";

export const getRecommendedAlbums = async () => {
  const response = await axiosGetData<AlbumModel[]>({
    url: EndPoint.recommendation,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await AsyncStorage.getItem(LocalDataKeys.accessToken)}`,
    },
  });
  
  return response.data;
};
export const getMyFavoriteTracks = async () => {
  const response = await axiosGetData<AlbumModel[]>({
    url: EndPoint.liked,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await AsyncStorage.getItem(LocalDataKeys.accessToken)}`,
    },
  });
  return response.data;
};
