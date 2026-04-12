import { StyleSheet, Text, View } from "react-native";
import { CircleWithExitDoorIcon } from "../common_componant/circle_with_exit_door_icon";
import AppColor from "../utils/app_color";
import AppFontsFamily from "../utils/app_fonts";
import { Divider } from 'react-native-paper';

export default function CustomListTile({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <View style={styleSheet.container}>
      <CircleWithExitDoorIcon />
      <View>
        <Text style={styleSheet.title}>{title}</Text>
        <Text style={styleSheet.description}>{description}</Text>
      </View>


    </View>
  );
}

const styleSheet = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    justifyContent: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontFamily:AppFontsFamily.semiBold,

  },
  description: {
    fontSize: 13,
    fontFamily:AppFontsFamily.regular,

    color: AppColor.darkGrayOpacity,
  },
});
