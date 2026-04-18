import AppColor from "@/core/utils/app_color";
import AppFontsFamily from "@/core/utils/app_fonts";
import { StyleSheet, Text, View } from "react-native";
import { useRecommended } from "../hooks/recommended_hooks";
import { FlatListErrorView } from "./flat_list_error_view";
import { FlatListLoadingView } from "./flat_list_loading_view";
import { HorizontalFlatList } from "./horizontal_flat_list";

export const RecomendedForYouComponant = () => {
  const { data, loading, error, getRecommended } = useRecommended();
  if (loading) {
    return <FlatListLoadingView />;
  }
  if (error) {
    return <FlatListErrorView retry={getRecommended} error={error} />;
  }
  return (
    <View style={{ gap: 10 }}>
      <Text style={styles.text}>Recommended for you</Text>
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
