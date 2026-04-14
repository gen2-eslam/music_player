import { axiosPostData } from "@/core/service/networking/axios";
import { EndPoint } from "@/core/service/networking/end_point";
import { RegisterRequest, RegisterResponse } from "../model/register_model";

export const registerAxios = (request: RegisterRequest) => {
  return axiosPostData<RegisterResponse>({
    url: EndPoint.register,
    data: request,
  });
};
