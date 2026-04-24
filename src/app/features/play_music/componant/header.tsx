import { ArrowBackIcon } from "@/core/common_componant/arrow_back_icon";
import AppColor from "@/core/utils/app_color";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import usePlayMusicHooks from "../hooks/play_music_hooks";

const Header = () => {
  const { isSmall, setIsSmall } = usePlayMusicHooks();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsSmall(!isSmall)}
        style={styles.iconContainer}
      >
        <ArrowBackIcon />
      </TouchableOpacity>
      <Text style={styles.text}>Now Playing</Text>
      <View style={styles.iconContainer} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    width: "100%",
  },
  iconContainer: {
    width: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: AppColor.dark,
    flex: 1,
    textAlign: "center",
  },
});
