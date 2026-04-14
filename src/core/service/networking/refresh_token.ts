import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocalDataKeys } from "../local_data_base/local_data_keys";
import { axiosInstance } from "./axios";
import { EndPoint } from "./end_point";

const refreshToken = async () => {
  const refreshToken = await AsyncStorage.getItem(LocalDataKeys.refreshToken);
  const response = await axiosInstance.post(EndPoint.refresh, {
    refresh: refreshToken,
  });
  await AsyncStorage.setItem(
    LocalDataKeys.accessToken,
    response.data["access"],
  );
};

export { refreshToken };
