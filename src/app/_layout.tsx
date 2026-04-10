import AppRoutes from "@/core/utils/app_routes";
import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <Stack
      initialRouteName={AppRoutes.onBoarding}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={AppRoutes.onBoarding} />
      <Stack.Screen name={AppRoutes.home} />
    </Stack>
  );
}
