import { Image, ImageBackground, StyleSheet, Text } from "react-native";

import { RedButtonWithArrow } from "@/core/common_componant/red_button_with_arrow";
import AppAssets from "@/core/utils/app_assets";
import AppColor from "@/core/utils/app_color";
import AppFontsFamily from "@/core/utils/app_fonts";
import { SafeAreaView } from "react-native-safe-area-context";
import useOnBoarding from "../hooks/on_boarding_hooks";
const OnBoardingScreen = () => {
  const { setOnBoardingDone } = useOnBoarding();
  return (
    <ImageBackground source={AppAssets.background} style={{ flex: 1 }}>
      <SafeAreaView style={styleSheet.continer}>
        <Image style={styleSheet.image} source={AppAssets.onBoarding} />
        <Text style={styleSheet.title}>Music Player App</Text>
        <Text style={styleSheet.description}>
          “A sleek, modern music app that brings your favorite songs, ar tists,
          and playlists together
        </Text>
        <RedButtonWithArrow onPress={setOnBoardingDone} />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default OnBoardingScreen;

const styleSheet = StyleSheet.create({
  continer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "70%",
    resizeMode: "contain",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontFamily: AppFontsFamily.semiBold,
    width: "70%",
  },
  description: {
    textAlign: "center",
    color: AppColor.lightGray,
    width: "70%",
    fontSize: 14,
    marginTop: 10,
    fontFamily: AppFontsFamily.regular,
  },
});
