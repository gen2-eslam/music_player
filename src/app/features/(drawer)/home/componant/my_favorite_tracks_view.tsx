import AppColor from "@/core/utils/app_color";
import AppFontsFamily from "@/core/utils/app_fonts";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMyFavoriteTracks } from "../hooks/tracks_hooks";
import { FlatListErrorView } from "./flat_list_error_view";
import { FlatListLoadingView } from "./flat_list_loading_view";
import { HorizontalFlatList } from "./horizontal_flat_list";

export const MyFavoriteTracksView = () => {
  const { data, loading, error, getTracksData } = useMyFavoriteTracks();
  if (loading) {
    return <FlatListLoadingView />;
  }
  if (error) {
    return <FlatListErrorView retry={getTracksData} error={error} />;
  }
  return (
    <View style={{ gap: 10 }}>
      <View style={styles.row}>
        <Text style={styles.text}>My Favorite Tracks</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <HorizontalFlatList data={data} />
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
});
