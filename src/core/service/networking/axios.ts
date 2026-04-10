import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosGetData = async ({ url, params }: { url: string; params?: any }) => {
  return await axiosInstance.get(url, { params });
};

const axiosPostData = async ({
  url,
  data,
  params,
}: {
  url: string;
  data?: any;
  params?: any;
}) => {
  return await axiosInstance.post(url, data, { params });
};

const axiosPutData = async ({
  url,
  data,
  params,
}: {
  url: string;
  data?: any;
  params?: any;
}) => {
  return await axiosInstance.put(url, data, { params });
};

const axiosDeleteData = async ({
  url,
  params,
}: {
  url: string;
  params?: any;
}) => {
  return await axiosInstance.delete(url, { params });
};

export {
  axiosInstance,
  axiosGetData,
  axiosPostData,
  axiosPutData,
  axiosDeleteData,
};
