import { RootState } from "@/core/redux/store";
import { LocalDataKeys } from "@/core/service/local_data_base/local_data_keys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AudioPlayer,
  AudioSource,
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSelector } from "react-redux";

// Infer status type since AudioPlayerStatus isn't exported directly
type PlayerStatus = ReturnType<typeof useAudioPlayerStatus>;

interface PlayMusicContextType {
  player: AudioPlayer;
  status: PlayerStatus;
  source: AudioSource | null;
  currentTime: number;
  togglePlayPause: () => void;
  seekTo: (time: number) => void;
  replaceSource: (source: AudioSource) => void;
}

export const PlayMusicContext = createContext<PlayMusicContextType | undefined>(
  undefined,
);

export const PlayMusicProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const currentMusic = useSelector(
    (state: RootState) => state.music.current_music,
  );
  const [token, setToken] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);

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

  useEffect(() => {
    setCurrentTime(status.currentTime);
  }, [status.currentTime]);

  const seekTo = (time: number) => {
    player.seekTo(time);
    setCurrentTime(time);
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

  const value = {
    player,
    status,
    source,
    currentTime,
    togglePlayPause,
    seekTo,
    replaceSource,
  };

  return (
    <PlayMusicContext.Provider value={value}>
      {children}
    </PlayMusicContext.Provider>
  );
};

export const usePlayMusic = () => {
  const context = useContext(PlayMusicContext);
  if (context === undefined) {
    throw new Error("usePlayMusic must be used within a PlayMusicProvider");
  }
  return context;
};
