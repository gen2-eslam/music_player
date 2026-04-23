import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SmallView from "./componant/small_view";
import { PlayMusicProvider } from "./context/play_music_context";

export default function PlayMusicScreen() {
  const [isSmall, setIsSmall] = useState(true);

  return (
    <PlayMusicProvider>
      <View style={isSmall ? styles.smallContainer : styles.container}>
        {isSmall ? (
          <TouchableOpacity onPress={() => setIsSmall(!isSmall)}>
            <SmallView />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsSmall(!isSmall)}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              Now Playing
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </PlayMusicProvider>
  );
}

const styles = StyleSheet.create({
  smallContainer: {
    height: "15%",
    width: "100%",
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
    height: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    padding: 20,
  },
});
