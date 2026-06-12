import { useEffect, useState } from "react";
import { getLikedTracksAxios, toggleLikeTrackAxios } from "../remote_data/favorites_axios";

import { LocalDataKeys } from "@/core/service/local_data_base/local_data_keys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";

let sound: Audio.Sound | null = null;

// ─── Types ────────────────────────────────────────────────────────────────────

export type FavoriteTrack = {
  id: number;
  title: string;
  artist: string;
  source: string;
  external_id: string;
  is_preview_only: boolean;
  genre: string;
  duration: number;
  cover_url: string;
  stream_url: string;
  created_at: string;
};

type SnackbarState = {
  visible: boolean;
  message: string;
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteTrack[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentlyPlaying, setCurrentlyPlaying] = useState<FavoriteTrack | null>(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    visible: false,
    message: "",
  });

  // ── Load liked tracks from API ──
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true);
        const response = await getLikedTracksAxios();
        setFavorites(response.data);
      } catch (error: any) {
        setSnackbar({
          visible: true,
          message: error?.response?.data?.detail ?? "Failed to load favorites.",
        });
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  // ── Filter by search query ──
  const filteredFavorites = favorites.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ── Play / Pause ──
  const handlePlay = async(track: FavoriteTrack) => {
    if (currentlyPlaying?.id === track.id) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(track);
      const token = await AsyncStorage.getItem(LocalDataKeys.accessToken);

if (sound) {
  await sound.unloadAsync();
}

const { sound: newSound } = await Audio.Sound.createAsync(
  {
    uri: track.stream_url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
  { shouldPlay: true }
);
sound = newSound;
    }
  };

  // ── Unlike a track (POST /api/tracks/{id}/like/ toggles it) ──
  const handleRemoveFavorite = async (trackId: number) => {
    // Optimistic update — remove from UI immediately
    setFavorites((prev) => prev.filter((t) => t.id !== trackId));
    if (currentlyPlaying?.id === trackId) setCurrentlyPlaying(null);

    try {
      await toggleLikeTrackAxios(trackId);
      setSnackbar({ visible: true, message: "Removed from favorites." });
    } catch (error: any) {
      // Rollback if API call fails — re-fetch to restore correct state
      setSnackbar({
        visible: true,
        message: error?.response?.data?.detail ?? "Could not remove. Try again.",
      });
      try {
        const response = await getLikedTracksAxios();
        setFavorites(response.data);
      } catch (_) {}
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    filteredFavorites,
    currentlyPlaying,
    loading,
    snackbar,
    setSnackbar,
    handlePlay,
    handleRemoveFavorite,
  };
};
