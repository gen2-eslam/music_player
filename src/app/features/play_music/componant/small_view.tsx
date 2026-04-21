import { RootState } from "@/core/redux/store";
import AppColor from "@/core/utils/app_color";
import AppFontsFamily from "@/core/utils/app_fonts";
import { Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import usePlayMusicHooks from "../hooks/play_music_hooks";
import { MusicSlider } from "./music_slider";

const SmallView = () => {
  const { seekTo, status } = usePlayMusicHooks();
  const { current_music } = useSelector((state: RootState) => state.music);
  return (
    <View style={styles.container}>
      <MusicSlider />
      <View style={styles.row}>
        <Image
          source={{ uri: current_music?.cover_url }}
          style={styles.image}
        />
        <TextContainer />
        {/* <PlayPauseButton /> */}
      </View>
    </View>
  );

  function TextContainer() {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.title}>{current_music?.title}</Text>
        <Text style={styles.artist}>{current_music?.artist}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    // elevation: 10,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: -2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
  },
  row: {
    width: "20%",
    height: "100%",
    flexDirection: "row",
    gap: 10,
  },
  image: {
    aspectRatio: 1 / 1,

    width: "100%",
  },
  textContainer: {
    gap: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontFamily: AppFontsFamily.extraBold,
    color: AppColor.dark,
  },
  artist: {
    fontSize: 16,
    fontFamily: AppFontsFamily.medium,
    color: AppColor.lightGray,
  },
});

export default SmallView;
