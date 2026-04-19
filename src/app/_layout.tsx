import AppRoutes from "@/core/utils/app_routes";
import {
  LexendDeca_100Thin,
  LexendDeca_200ExtraLight,
  LexendDeca_300Light,
  LexendDeca_400Regular,
  LexendDeca_500Medium,
  LexendDeca_600SemiBold,
  LexendDeca_700Bold,
  LexendDeca_800ExtraBold,
  LexendDeca_900Black,
} from "@expo-google-fonts/lexend-deca";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    LexendDeca_100Thin,
    LexendDeca_200ExtraLight,
    LexendDeca_300Light,
    LexendDeca_400Regular,
    LexendDeca_500Medium,
    LexendDeca_600SemiBold,
    LexendDeca_700Bold,
    LexendDeca_800ExtraBold,
    LexendDeca_900Black,
  });
  return (
    <Stack
      initialRouteName={(AppRoutes.onBoarding as string).replace("/", "")}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={(AppRoutes.onBoarding as string).replace("/", "")} />
      <Stack.Screen name={(AppRoutes.login as string).replace("/", "")} />
      <Stack.Screen
        name={(AppRoutes.drawerLayout as string).replace("/", "")}
      />
      <Stack.Screen name={(AppRoutes.playMusic as string).replace("/", "")} />
    </Stack>
  );
}
