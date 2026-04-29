import { FavButton } from "@/core/common_componant/fav_button";
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
import { AlbumModel } from "../data/model/play_list_model";

const { width } = Dimensions.get("window");

export const HorizontalFlatList = ({ data }: { data: AlbumModel[] }) => {
  const dispatch = useDispatch();
  const { handleAddMusicToFav } = useMyFavHooks();
  return (
    <FlatList
      data={data}
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
                index: data.indexOf(item),
                list_music: data,
              }),
            );
          }}
        >
          <ImageBackground
            source={{ uri: item.cover_url }}
            style={styles.image}
            imageStyle={{ borderRadius: 10 }}
          >
            <FavButton
              handleAddMusicToFav={() =>
                handleAddMusicToFav(item.id.toString())
              }
            />
          </ImageBackground>
          <Text style={styles.flatListTitle}>{item.title}</Text>
          <Text style={styles.flatListSubTitle}>{item.artist}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
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
