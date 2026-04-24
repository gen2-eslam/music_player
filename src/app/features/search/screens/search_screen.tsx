import { ArrowBackIcon } from "@/core/common_componant/arrow_back_icon";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowBackIcon />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 30,
  },
});
