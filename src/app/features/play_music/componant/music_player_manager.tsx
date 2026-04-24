import { fetchToken } from "@/core/redux/music_reducer";
import { AppDispatch, RootState } from "@/core/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const MusicPlayerManager: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { source, player } = useSelector((state: RootState) => state.music);

  useEffect(() => {
    dispatch(fetchToken());
  }, [dispatch]);

  // Update source manually on the persistent player instance
  useEffect(() => {
    if (player && source) {
      player.replace(source);
      player.play();
    }
  }, [source, player]);

  return <>{children}</>;
};
