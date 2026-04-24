import React, { useEffect } from "react";
import { AlbumModel } from "../../(drawer)/home/data/model/play_list_model";
import { searchAxios } from "../search_axios";

export const useSearch = () => {
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [data, setData] = React.useState<AlbumModel[]>([]);
  useEffect(() => {
    if (search.length > 0) {
      handleSearch();
    }
  }, [search]);

  const handleSearch = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await searchAxios(search);
      setData(response.data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    search,
    setSearch,
    loading,
    error,
    data,
  };
};
