import AppColor from "@/core/utils/app_color";
import AppFontsFamily from "@/core/utils/app_fonts";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export const HorizontalFlatList = ({ data, onSongPress }: any) => {
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
          activeOpacity={0.8}
          onPress={() => onSongPress && onSongPress(item)}
        >
          <View style={styles.item}>
            <Image source={{ uri: item.cover_url }} style={styles.image} />
            <Text style={styles.flatListTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.flatListSubTitle} numberOfLines={1}>{item.artist}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  flatListTitle: {
    fontSize: 16,
    fontFamily: AppFontsFamily.medium,
    width: 190,
    color: AppColor.dark,
    textAlign: "center",
  },
  flatListSubTitle: {
    fontSize: 14,
    fontFamily: AppFontsFamily.medium,
    color: AppColor.lightGray,
    textAlign: "center",
    width: 190,
  },
  item: {
    alignItems: "center",
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
    marginBottom: 5,
  },
});