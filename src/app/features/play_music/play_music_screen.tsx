import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FullView from "./componant/full_view";
import SmallView from "./componant/small_view";
import usePlayMusicHooks from "./hooks/play_music_hooks";
const { height } = Dimensions.get("window");

export default function PlayMusicScreen() {
  const { isSmall, setIsSmall } = usePlayMusicHooks();

  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      style={isSmall ? styles.smallContainer : styles.container}
    >
      {isSmall ? (
        <TouchableOpacity onPress={() => setIsSmall(!isSmall)}>
          <SmallView />
        </TouchableOpacity>
      ) : (
        <FullView />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  smallContainer: {
    width: "100%",
    height: height * 0.1,
    backgroundColor: "#fff",
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: -2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  container: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: height,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    padding: 20,
  },
});
