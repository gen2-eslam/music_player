import AppColor from "@/core/utils/app_color";
import React from "react";
import { StyleSheet, View } from "react-native";
import { MyFavoriteTracksView } from "./componant/my_favorite_tracks_view";
import { RecomendedForYouComponant } from "./componant/recomended_for_you_componant";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <RecomendedForYouComponant />
        <MyFavoriteTracksView />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  innerContainer: {
    gap: 20,
    padding: 20,
  },
});
