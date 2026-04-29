import {
  addTrackToPlaylist,
  createPlaylist,
  deletePlaylist,
  fetchMyPlayList,
  removeFromPlaylist,
  updatePlaylist,
} from "@/core/redux/my_play_list_thunk";
import { AppDispatch, RootState } from "@/core/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const usePlayListHooks = () => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const dispatch = useDispatch<AppDispatch>();
  const { list_playlist } = useSelector((state: RootState) => state.myPlayList);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchMyPlayList())
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [dispatch]);

  const handleCreatePlaylist = async () => {
    try {
      await dispatch(createPlaylist({ name, description })).unwrap();
      dispatch(fetchMyPlayList());
    } catch (error) {
      console.error("Failed to create playlist", error);
    }
  };

  const handleAddTrackToPlaylist = async (
    playlistId: string,
    trackId: string,
  ) => {
    try {
      await dispatch(addTrackToPlaylist({ playlistId, trackId })).unwrap();
      dispatch(fetchMyPlayList());
    } catch (error) {
      console.error("Failed to add track", error);
    }
  };

  const handleRemoveFromPlaylist = async (trackId: string) => {
    try {
      await dispatch(removeFromPlaylist({ trackId })).unwrap();
      dispatch(fetchMyPlayList());
    } catch (error) {
      console.error("Failed to remove track", error);
    }
  };

  const handleUpdatePlaylist = async (
    playlistId: string,
    name: string,
    description: string,
  ) => {
    try {
      await dispatch(
        updatePlaylist({ playlistId, name, description }),
      ).unwrap();
      dispatch(fetchMyPlayList());
    } catch (error) {
      console.error("Failed to update playlist", error);
    }
  };

  const handleDeletePlaylist = async (playlistId: string) => {
    try {
      await dispatch(deletePlaylist(playlistId)).unwrap();
      dispatch(fetchMyPlayList());
    } catch (error) {
      console.error("Failed to delete playlist", error);
    }
  };

  return {
    list_playlist,
    handleCreatePlaylist,
    handleAddTrackToPlaylist,
    handleRemoveFromPlaylist,
    handleUpdatePlaylist,
    handleDeletePlaylist,
    visible,
    name,
    setName,
    description,
    setDescription,
    showDialog,
    hideDialog,
  };
};
