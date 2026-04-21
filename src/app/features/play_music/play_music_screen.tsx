import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SmallView from "./componant/small_view";
import usePlayMusicHooks from "./hooks/play_music_hooks";
export default function PlayMusicScreen() {
  const [isSmall, setIsSmall] = useState(true);
  const { player, status, source } = usePlayMusicHooks();

  return (
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

      {/* <Text style={{ textAlign: "center", color: "#666", fontSize: 12 }}>
        {source?.uri}
      </Text>

      {status.isBuffering && <ActivityIndicator size="large" color="#0000ff" />}

      {!status.isLoaded && !status.isBuffering && (
        <Text style={{ color: "gray" }}>Loading...</Text>
      )}

      <View style={{ width: "100%", alignItems: "center", gap: 5 }}>
        <Text>Status: {status.playing ? "Playing" : "Paused/Stopped"}</Text>
        <Text>
          {Math.floor(status.currentTime)} / {Math.floor(status.duration)}s
        </Text>
      </View>

      <View style={{ marginVertical: 20, gap: 10, width: "100%" }}>
        <Button
          title={status.playing ? "Pause" : "Play"}
          onPress={() => (status.playing ? player.pause() : player.play())}
        />
        <Button
          title="Restart"
          onPress={() => {
            player.seekTo(0);
            player.play();
          }}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  smallContainer: {
    height: "10%",
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
