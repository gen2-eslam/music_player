import axios from "axios";
import { EndPoint } from "./end_point";
const axiosInstance = axios.create({
  baseURL: EndPoint.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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
