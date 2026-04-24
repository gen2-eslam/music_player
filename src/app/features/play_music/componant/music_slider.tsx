import AppColor from "@/core/utils/app_color";
import Slider from "@react-native-community/slider";
import { StyleSheet } from "react-native";
import usePlayMusicHooks from "../hooks/play_music_hooks";

export const MusicSlider = () => {
  const { seekTo, status } = usePlayMusicHooks();
  return (
    <Slider
      style={styles.slider}
      value={status.currentTime}
      minimumValue={0}
      maximumValue={status.duration}
      step={1}
      onValueChange={(value: number) => {
        seekTo(value);
      }}
      minimumTrackTintColor={AppColor.lightGray}
      maximumTrackTintColor={AppColor.lightGray}
      thumbTintColor={AppColor.dark}
    />
  );
};

const styles = StyleSheet.create({
  slider: {
    width: "100%",
    // height: 5,
    padding: 0,
  },
});
