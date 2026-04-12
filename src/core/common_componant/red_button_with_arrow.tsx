import AppColor from "@/core/utils/app_color";
import { IconlyBoldArrowLeft } from "@/core/utils/icons/arrow_left";
import { Link, type Href } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import AppFontsFamily from "../utils/app_fonts";

export const RedButtonWithArrow = ({ route }: { route: Href }) => {
  return (
    <Link href={route} asChild>
      <Pressable style={styleSheet.button}>
        <Text style={styleSheet.btntxt}>Let’s Start</Text>
        <IconlyBoldArrowLeft />
      </Pressable>
    </Link>
  );
};

const styleSheet = StyleSheet.create({
  button: {
    margin: 20,
    flexDirection: "row",
    backgroundColor: AppColor.red,
    padding: 10,
    borderRadius: 14,
    alignItems: "center",
    width: "80%",
  },
  btntxt: {
    flex: 1,
    textAlign: "center",
    fontSize: 19,
    color: AppColor.white,
    fontFamily: AppFontsFamily.semiBold,
  },
});
