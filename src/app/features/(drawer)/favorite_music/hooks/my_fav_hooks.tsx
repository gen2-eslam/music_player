import {
  addFavoriteTrack,
  getMyFavoriteTracks,
} from "@/core/redux/my_fav_reducer";
import { AppDispatch, RootState } from "@/core/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useMyFavHooks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const list_favorite = useSelector(
    (state: RootState) => state.myFav.list_favorite,
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getMyFavoriteTracks())
      .unwrap()
      .then(() => {
        setLoading(false);
      });
  }, []);

  const handleAddMusicToFav = async (id: string) => {
    try {
      await dispatch(addFavoriteTrack(id)).unwrap();
      dispatch(getMyFavoriteTracks());
    } catch (error) {
      console.error("Failed to create playlist", error);
    }
  };
  return {
    list_favorite,
    loading,
    handleAddMusicToFav,
  };
};
