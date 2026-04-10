import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import AppColor from "../../../../core/utils/app_color";
const OnBoardingScreen = () => {
  return (
    <ImageBackground
      source={require("../../../../../assets/background.png")}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styleSheet.continer}>
        <Image
          style={styleSheet.image}
          source={require("../../../../../assets/on_boarding.png")}
        />
        <Text style={styleSheet.title}>Music Player App</Text>
        <Text style={styleSheet.description}>
          “A sleek, modern music app that brings your favorite songs, artists,
          and playlists together
        </Text>
        <View style={styleSheet.button}>
          <Text style={styleSheet.btntxt}>Let’s Start</Text>
          <Image source={require("../../../../../assets/Arrow_Left.png")} />
        </View>
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
    backgroundColor: AppColor.white,
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
