import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
      <Stack.Screen
        name="features/onboarding/screens/onboarding_screen"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
