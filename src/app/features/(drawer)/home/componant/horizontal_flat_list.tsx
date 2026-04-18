import AppColor from "@/core/utils/app_color";
import AppFontsFamily from "@/core/utils/app_fonts";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AlbumModel } from "../data/model/play_list_model";

const { width } = Dimensions.get("window");

export const HorizontalFlatList = ({ data }: { data: AlbumModel[] }) => {
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
        <View style={styles.item}>
          <Image source={{ uri: item.cover_url }} style={styles.image} />
          <Text style={styles.flatListTitle}>{item.title}</Text>

          <Text style={styles.flatListSubTitle}>{item.artist}</Text>
        </View>
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
