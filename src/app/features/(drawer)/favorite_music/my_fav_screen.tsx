import { setCurrentMusicIndex, setListMusic } from "@/core/redux/music_reducer";
import AppColor from "@/core/utils/app_color";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { useMyFavHooks } from "./hooks/my_fav_hooks";

const MyFavScreen = () => {
  const { list_favorite, loading } = useMyFavHooks();
  const dispatch = useDispatch();
  return (
    <FlatList
      data={list_favorite}
      contentContainerStyle={{
        justifyContent: "space-between",

        padding: 10,
        margin: 10,
      }}
      numColumns={2}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            dispatch(
              setCurrentMusicIndex({
                index: list_favorite.indexOf(item),
                list_music: list_favorite,
              }),
            );
          }}
        >
          <ImageBackground
            source={{ uri: item.cover_url }}
            style={styles.card}
            imageStyle={styles.image}
          >
            <View style={styles.overlay}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.artist}>{item.artist}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        loading ? (
          <ActivityIndicator size="large" color={AppColor.red} />
        ) : (
          <View style={styles.empty}>
            <Text>No data</Text>
          </View>
        )
      }
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default MyFavScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 30,
  },
  card: {
    width: 150,
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  overlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    position: "absolute",
    bottom: 25,
  },
  artist: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    position: "absolute",
    bottom: 5,
  },
  empty: {
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
});
