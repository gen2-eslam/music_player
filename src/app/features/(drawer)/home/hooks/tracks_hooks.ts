import { useEffect, useState } from "react";
import { AlbumModel } from "../data/model/play_list_model";
import { getMyFavoriteTracks } from "../data/remote_data/home_axios";
export const useMyFavoriteTracks = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AlbumModel[]>([]);

  useEffect(() => {
    getTracksData();
  }, []);

  const getTracksData = async () => {
    setLoading(true);
    getMyFavoriteTracks()
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    loading,
    error,
    data,
    getTracksData,
  };
};
