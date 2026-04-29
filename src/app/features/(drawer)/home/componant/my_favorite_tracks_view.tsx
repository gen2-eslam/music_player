import { setCurrentMusicIndex } from "@/core/redux/music_reducer";
import AppColor from "@/core/utils/app_color";
import AppFontsFamily from "@/core/utils/app_fonts";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { useMyFavHooks } from "../../favorite_music/hooks/my_fav_hooks";
import { FlatListLoadingView } from "./flat_list_loading_view";

const { width } = Dimensions.get("window");
export const MyFavoriteTracksView = () => {
  const { loading ,list_favorite } = useMyFavHooks();
  const dispatch = useDispatch();
  if (loading) {
    return <FlatListLoadingView />;
  }

  return (
    <View style={{ gap: 10 }}>
      <View style={styles.row}>
        <Text style={styles.text}>My Favorite Tracks</Text>
      </View>
      <FlatList
        data={list_favorite}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 10 }}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.flatListEmpty}>
            <Text style={styles.flatListTitle}>No data found</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
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
              style={styles.image}
              imageStyle={{ borderRadius: 10 }}
            ></ImageBackground>
            <Text style={styles.flatListTitle}>{item.title}</Text>
            <Text style={styles.flatListSubTitle}>{item.artist}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontFamily: AppFontsFamily.bold,
    color: AppColor.dark,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  seeAllText: {
    fontSize: 16,
    fontFamily: AppFontsFamily.bold,
    color: AppColor.lightBlue,
  },
  flatListTitle: {
    fontSize: 16,
    fontFamily: AppFontsFamily.medium,
    width: "70%",
    color: AppColor.dark,
    textAlign: "center",
  },
  flatListSubTitle: {
    fontSize: 14,
    fontFamily: AppFontsFamily.medium,
    color: AppColor.lightGray,
    textAlign: "center",
    width: "70%",
  },
  item: {
    alignItems: "center",
    // justifyContent: "center",
  },
  flatListEmpty: {
    width: width - 40,
    height: 200,
    backgroundColor: AppColor.lightRed,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 190,
    height: 190,
    borderRadius: 10,
  },
});
