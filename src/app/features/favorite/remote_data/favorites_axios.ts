import { AsyncStorageService } from "@/core/service/local_data_base/async_storage_service";
import { LocalDataKeys } from "@/core/service/local_data_base/local_data_keys";
import axios from "axios";

const BASE_URL = "https://musicapp-production-bcd8.up.railway.app";

const getAuthHeader = async () => {
  const token = await AsyncStorageService.getData(LocalDataKeys.accessToken);
  return { Authorization: `Bearer ${token}` };
};

export const getLikedTracksAxios = async () => {
  const headers = await getAuthHeader();
  return axios.get(`${BASE_URL}/api/liked/`, { headers });
};

export const toggleLikeTrackAxios = async (trackId: number) => {
  const headers = await getAuthHeader();
  return axios.post(`${BASE_URL}/api/tracks/${trackId}/like/`, {}, { headers });
};
