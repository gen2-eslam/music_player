import { Text, View } from "react-native";

export default function PlaylistScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>My Playlist</Text>
    </View>
  );
}
