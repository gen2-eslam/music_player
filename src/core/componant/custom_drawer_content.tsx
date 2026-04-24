import { CircleWithExitDoorIcon } from "@/core/componant/circle_with_exit_door_icon";
import { AsyncStorageService } from "@/core/service/local_data_base/async_storage_service";
import AppRoutes from "@/core/utils/app_routes";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { View } from "react-native";
import AppColor from "../utils/app_color";
import AppFontsFamily from "../utils/app_fonts";

export default function CustomDrawerContent(props: any) {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <DrawerItem
        label="Logout"
        labelStyle={{
          fontFamily: AppFontsFamily.regular,
          fontSize: 16,
          color: AppColor.red,
        }}
        icon={() => <CircleWithExitDoorIcon iconSize={20} />}
        onPress={() => {
          AsyncStorageService.clearAll();
          router.replace(AppRoutes.login);
        }}
      />
    </View>
  );
}
