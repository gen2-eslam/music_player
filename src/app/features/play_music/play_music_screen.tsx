import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import usePlayMusicHooks from "./hooks/play_music_hooks";

export default function PlayMusicScreen() {
  const { player, status, source } = usePlayMusicHooks();

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        Now Playing
      </Text>

      <Text style={{ textAlign: "center", color: "#666", fontSize: 12 }}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    padding: 20,
  },
});
