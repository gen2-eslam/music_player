import {
  nextMusic as nextMusicAction,
  previousMusic as previousMusicAction,
  setIsSmall as setIsSmallAction,
} from "@/core/redux/music_reducer";
import { AppDispatch, RootState } from "@/core/redux/store";
import { useAudioPlayerStatus } from "expo-audio";
import { useDispatch, useSelector } from "react-redux";

export default function usePlayMusicHooks() {
  const dispatch = useDispatch<AppDispatch>();
  const { player, isSmall, source, has_next, has_previous } = useSelector(
    (state: RootState) => state.music,
  );

  const status = useAudioPlayerStatus(player);

  const setIsSmall = (value: boolean) => {
    dispatch(setIsSmallAction(value));
  };

  const togglePlayPause = () => {
    if (!player) return;
    if (status.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  const seekTo = (time: number) => {
    if (!player) return;
    player.seekTo(time);
  };

  const nextMusic = () => {
    dispatch(nextMusicAction());
  };

  const previousMusic = () => {
    dispatch(previousMusicAction());
  };

  const replaceSource = (newSource: any) => {
    if (!player) return;
    player.replace(newSource);
  };

  return {
    player,
    status,
    isSmall,
    setIsSmall,
    source,
    togglePlayPause,
    seekTo,
    replaceSource,
    has_next,
    has_previous,
    nextMusic,
    previousMusic,
  };
}
