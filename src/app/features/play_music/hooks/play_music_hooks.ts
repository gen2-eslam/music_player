import { useContext } from "react";
import { PlayMusicContext } from "../context/play_music_context";

export default function usePlayMusicHooks() {
  const context = useContext(PlayMusicContext);
  if (context === undefined) {
    throw new Error(
      "usePlayMusicHooks must be used within a PlayMusicProvider",
    );
  }
  return context;
}
