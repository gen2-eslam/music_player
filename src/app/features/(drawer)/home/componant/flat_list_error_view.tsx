import AppColor from "@/core/utils/app_color";
import AppFontsFamily from "@/core/utils/app_fonts";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const FlatListErrorView = ({
  retry,
  error,
}: {
  retry: () => void;
  error: string;
}) => {
  return (
    <View style={styles.flatListErrorView}>
      <Text style={styles.flatListTitle}>{error}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={retry}>
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flatListErrorView: {
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    backgroundColor: AppColor.lightRed,
    borderRadius: 20,
  },
  flatListTitle: {
    fontSize: 18,
    fontFamily: AppFontsFamily.bold,
    color: AppColor.dark,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: AppColor.red,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 16,
    fontFamily: AppFontsFamily.bold,
    color: AppColor.white,
  },
});
