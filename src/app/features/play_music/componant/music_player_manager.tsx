import { fetchToken, setPlayer } from "@/core/redux/music_reducer";
import { AppDispatch, RootState } from "@/core/redux/store";
import { useAudioPlayer } from "expo-audio";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const MusicPlayerManager: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const source = useSelector((state: RootState) => state.music.source);
  const player = useAudioPlayer(source);

  useEffect(() => {
    dispatch(fetchToken());
  }, [dispatch]);

  useEffect(() => {
    if (player) {
      dispatch(setPlayer(player));
    }
  }, [player, dispatch]);

  useEffect(() => {
    if (player && source) {
      player.play();
    }
  }, [source, player]);

  return <>{children}</>;
};
