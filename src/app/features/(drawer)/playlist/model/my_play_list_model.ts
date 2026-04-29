import { AlbumModel } from "@/app/features/(drawer)/home/data/model/play_list_model";

export interface MyPlayListModel {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  track_count: number;
  tracks: AlbumModel[];
}
export interface MyPlayListModelResponse {
  id: number;
  name: string;
  description: string;
  created_at: string;
  track_count: number;
}
