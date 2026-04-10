import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

import AppAssets from "@/core/utils/app_assets";
import AppColor from "@/core/utils/app_color";
import AppRoutes from "@/core/utils/app_routes";
import { IconlyBoldArrowLeft } from "@/core/utils/icons/arrow_left";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
const OnBoardingScreen = () => {
  return (
    <ImageBackground source={AppAssets.background} style={{ flex: 1 }}>
      <SafeAreaView style={styleSheet.continer}>
        <Image style={styleSheet.image} source={AppAssets.onBoarding} />
        <Text style={styleSheet.title}>Music Player App</Text>
        <Text style={styleSheet.description}>
          “A sleek, modern music app that brings your favorite songs, ar tists,
          and playlists together
        </Text>
        <Link href={AppRoutes.home}>
          <Pressable style={styleSheet.button}>
            <Text style={styleSheet.btntxt}>Let’s Start</Text>
            <IconlyBoldArrowLeft />
          </Pressable>
        </Link>
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
    fontWeight: "bold",
    width: "70%",
  },
  description: {
    textAlign: "center",
    color: AppColor.lightGray,
    width: "70%",
    marginTop: 10,
  },
  button: {
    margin: 20,
    flexDirection: "row",
    backgroundColor: AppColor.red,
    padding: 10,
    borderRadius: 20,
    alignSelf: "center",
    width: "80%",
  },
  btntxt: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    color: AppColor.white,
    fontWeight: "bold",
  },
});
