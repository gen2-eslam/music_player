import { View } from "react-native";
import { StyleSheet } from "react-native";
import AppColor from "@/core/utils/app_color";
import { ExitDoor } from "@/core/utils/icons/exit_door";

export const CircleWithExitDoorIcon = () => {
  return (
    <View style={styleSheet.iconContainer}>
      <ExitDoor width={30} height={30} />
    </View>
  );
};

const styleSheet = StyleSheet.create({
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: AppColor.lightRed,
    justifyContent: "center",
    alignItems: "center",
  },
});
