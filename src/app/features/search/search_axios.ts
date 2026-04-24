import { axiosGetData } from "@/core/service/networking/axios";
import { EndPoint } from "@/core/service/networking/end_point";
import { AlbumModel } from "../(drawer)/home/data/model/play_list_model";

export const searchAxios = async (search: string) => {
  const response = await axiosGetData<AlbumModel[]>({
    url: EndPoint.tracks_search,
    params: {
      q: search,
      limit: 20,
    },
  });
  return response;
};
