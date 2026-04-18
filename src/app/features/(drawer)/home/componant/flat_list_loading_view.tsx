import AppColor from "@/core/utils/app_color";
import AppFontsFamily from "@/core/utils/app_fonts";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export const FlatListLoadingView = () => {
  return (
    <View style={styles.flatListLoadingView}>
      <ActivityIndicator size="large" color={AppColor.dark} />
      <Text style={styles.flatListTitle}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flatListLoadingView: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 20,
  },
  flatListTitle: {
    fontSize: 18,
    fontFamily: AppFontsFamily.bold,
    color: AppColor.dark,
  },
});
