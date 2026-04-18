import { useEffect, useState } from "react";
import { AlbumModel } from "../data/model/play_list_model";
import { getRecommendedAlbums } from "../data/remote_data/home_axios";

export const useRecommended = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AlbumModel[]>([]);

  useEffect(() => {
    getRecommended();
  }, []);

  const getRecommended = async () => {
    setLoading(true);
    getRecommendedAlbums()
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
    getRecommended,
  };
};
