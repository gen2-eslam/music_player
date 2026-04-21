import Slider from "@react-native-community/slider";
import { StyleSheet, View } from "react-native";
import usePlayMusicHooks from "../hooks/play_music_hooks";

const SmallView = () => {
  const { seekTo, status } = usePlayMusicHooks();
  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        value={status.currentTime / status.duration}
        onValueChange={(value) => {
          seekTo(value * status.duration);
        }}
        minimumTrackTintColor="#1EB1FC"
        maximumTrackTintColor="#d3d3d3"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  slider: {
    width: "100%",
    height: 40,
  },
});

export default SmallView;
