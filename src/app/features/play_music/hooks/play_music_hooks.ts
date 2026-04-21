import { RootState } from "@/core/redux/store";
import { LocalDataKeys } from "@/core/service/local_data_base/local_data_keys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AudioSource, useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

export default function usePlayMusicHooks() {
  const currentMusic = useSelector(
    (state: RootState) => state.music.current_music,
  );
  const [token, setToken] = useState<string | null>(null);
  const fetchToken = async () => {
    const storedToken = await AsyncStorage.getItem(LocalDataKeys.accessToken);
    setToken(storedToken);
  };
  useEffect(() => {
    fetchToken();
  }, []);

  const safeUrl = useMemo(() => {
    if (!currentMusic?.stream_url) return null;
    const url = Array.isArray(currentMusic.stream_url)
      ? currentMusic.stream_url[0]
      : currentMusic.stream_url;
    if (url.startsWith("http://")) {
      return url.replace("http://", "https://");
    }
    return url;
  }, [currentMusic]);

  const source = useMemo(() => {
    if (!safeUrl) return null;

    const headers: Record<string, string> = {
      "Content-Type": "audio/mpeg",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return {
      uri: safeUrl,
      headers,
    };
  }, [safeUrl, token]);

  const player = useAudioPlayer(source);
  const status = useAudioPlayerStatus(player);

  // useEffect(() => {
  //   if (status.duration > 0 && !status.playing) {
  //     player.play();
  //     console.log(status.duration);
  //   }
  // }, [status.duration, status.playing]);

  const seekTo = (time: number) => {
    player.pause();
    player.seekTo(time);
    player.play();
  };
  const togglePlayPause = () => {
    if (status.playing) {
      player.pause();
    } else {
      player.play();
    }
  };
  const replaceSource = (source: AudioSource) => {
    player.replace(source);
  };

  return {
    player,
    status,
    source,
    togglePlayPause,
    seekTo,
    replaceSource,
  };
}
