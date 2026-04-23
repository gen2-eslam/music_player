import { RootState } from "@/core/redux/store";
import AppColor from "@/core/utils/app_color";
import AppFontsFamily from "@/core/utils/app_fonts";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import usePlayMusicHooks from "../hooks/play_music_hooks";
import { BackMusicIcon } from "./back_music_icon";
import Header from "./header";
import { MusicSlider } from "./music_slider";
import { NextMusicIcon } from "./next_music_icon";
import { PauseMusicIcon } from "./pause_music";
import { PlayMusicIcon } from "./play_music";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};
export default function FullView() {
  const { current_music } = useSelector((state: RootState) => state.music);
  const { status, togglePlayPause } = usePlayMusicHooks();

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Image source={{ uri: current_music?.cover_url }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{current_music?.title}</Text>
        <Text style={styles.artist} numberOfLines={1}>
          {current_music?.artist}
        </Text>
      </View>
      <View>
        <View style={styles.timeContainer}>
          <Text>{formatTime(status.currentTime)}</Text>
          <Text>{formatTime(status.duration)}</Text>
        </View>
        <MusicSlider />
      </View>
      <MusicPlayerButton />
    </SafeAreaView>
  );
}

const MusicPlayerButton = () => {
  const { status, togglePlayPause } = usePlayMusicHooks();
  return (
    <View style={styles.musicPlayerButton}>
      <TouchableOpacity onPress={() => {}}>
        <BackMusicIcon />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => togglePlayPause()}>
        {status.playing ? <PauseMusicIcon /> : <PlayMusicIcon />}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <NextMusicIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    gap: 15,
  },
  image: {
    width: "80%",
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 20,
    alignSelf: "center",
  },

  musicPlayerButton: {
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: AppFontsFamily.medium,
    color: AppColor.dark,
  },
  artist: {
    fontSize: 18,
    fontFamily: AppFontsFamily.regular,
    color: AppColor.lightGray,
  },
});
