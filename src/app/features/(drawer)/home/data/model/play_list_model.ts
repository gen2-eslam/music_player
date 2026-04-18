export interface AlbumModel {
  id: number;
  title: string;
  artist: string;
  source: string;
  external_id: string;
  is_preview_only: boolean;
  genre: string;
  duration: number;
  cover_url: string;
  stream_url: string;
  created_at: string;
}
