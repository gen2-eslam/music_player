import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LocalDataKeys } from "../local_data_base/local_data_keys";
import { EndPoint } from "./end_point";
import { refreshToken } from "./refresh_token";
const axiosInstance = axios.create({
  baseURL: EndPoint.BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshToken();
        const newToken = await AsyncStorage.getItem(LocalDataKeys.accessToken);
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

const axiosGetData = async <T>({
  url,
  headers,
  params,
}: {
  url: string;
  headers?: any;
  params?: any;
}) => {
  return await axiosInstance.get<T>(url, { headers, params });
};

const axiosPostData = async <T>({
  url,
  data,
  params,
}: {
  url: string;
  data?: any;
  params?: any;
}) => {
  return await axiosInstance.post<T>(url, data, { params });
};

const axiosPutData = async <T>({
  url,
  data,
  params,
}: {
  url: string;
  data?: any;
  params?: any;
}) => {
  return await axiosInstance.put<T>(url, data, { params });
};

const axiosDeleteData = async <T>({
  url,
  params,
}: {
  url: string;
  params?: any;
}) => {
  return await axiosInstance.delete<T>(url, { params });
};

export {
  axiosDeleteData,
  axiosGetData,
  axiosInstance,
  axiosPostData,
  axiosPutData,
};
