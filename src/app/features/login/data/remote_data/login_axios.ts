import { axiosPostData } from "@/core/service/networking/axios";
import { EndPoint } from "@/core/service/networking/end_point";
import { LoginRequest, LoginResponse } from "../model/login_data_type";

export const loginAxios = (request: LoginRequest) => {
  return axiosPostData<LoginResponse>({
    url: EndPoint.login,
    data: request,
  });
};
