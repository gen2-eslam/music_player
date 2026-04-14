import axios from "axios";
import { EndPoint } from "./end_point";
import { refreshToken } from "./refresh_token";
const axiosInstance = axios.create({
  baseURL: EndPoint.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await refreshToken();
    }
    return Promise.reject(error);
  },
);

const axiosGetData = async <T>({
  url,
  params,
}: {
  url: string;
  params?: any;
}) => {
  return await axiosInstance.get<T>(url, { params });
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
