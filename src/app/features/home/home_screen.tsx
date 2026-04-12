import { AsyncStorageService } from "@/core/service/local_data_base/async_storage_service";
import AppRoutes from "@/core/utils/app_routes";
import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

const HomeScreen = () => {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>HomeScreen</Text>
      <Button
        title="Logout"
        onPress={() => {
          AsyncStorageService.clearAll();
          router.replace(AppRoutes.login);
        }}
      />
    </View>
  );
};

export default HomeScreen;
