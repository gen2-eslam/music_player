import { LocalDataKeys } from "@/core/service/local_data_base/local_data_keys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AudioSource, useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";

export default function usePlayMusicHooks() {
  const { StreamUrl } = useLocalSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const fetchToken = async () => {
    const storedToken = await AsyncStorage.getItem(LocalDataKeys.accessToken);
    setToken(storedToken);
  };
  useEffect(() => {
    fetchToken();
  }, []);

  const safeUrl = useMemo(() => {
    if (!StreamUrl) return null;
    const url = Array.isArray(StreamUrl) ? StreamUrl[0] : StreamUrl;
    if (url.startsWith("http://")) {
      return url.replace("http://", "https://");
    }
    return url;
  }, [StreamUrl]);

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

  useEffect(() => {
    if (source && player && status.isLoaded && token) {
      player.play();
    }
  }, [source, player, status.isLoaded, token]);

  const seekTo = (time: number) => {
    player.seekTo(time);
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
