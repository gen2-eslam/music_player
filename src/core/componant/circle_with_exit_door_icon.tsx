import AppColor from "@/core/utils/app_color";
import { ExitDoor } from "@/core/utils/icons/exit_door";
import { StyleSheet, View } from "react-native";

export const CircleWithExitDoorIcon = ({
  iconSize = 30,
}: {
  iconSize?: number;
}) => {
  return (
    <View
      style={[
        styleSheet.iconContainer,
        { width: iconSize * 2, height: iconSize * 2, borderRadius: iconSize },
      ]}
    >
      <ExitDoor width={iconSize} height={iconSize} />
    </View>
  );
};

const styleSheet = StyleSheet.create({
  iconContainer: {
    backgroundColor: AppColor.lightRed,
    justifyContent: "center",
    alignItems: "center",
  },
});
