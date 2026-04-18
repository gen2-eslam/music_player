import AppColor from "@/core/utils/app_color";
import AppFontsFamily from "@/core/utils/app_fonts";
import { StyleSheet, Text, View } from "react-native";
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
      <Text style={styles.text}>My Favorite Tracks</Text>
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
});
