import { Href } from "expo-router";

const AppRoutes = {
  onBoarding: "/features/onboarding/screens/onboarding_screen" as Href,
  drawerLayout: "/features/(drawer)" as Href,
  home: "/features/(drawer)/home_screen" as Href,
  login: "/features/login/screens/login_screen" as Href,
  register: "/features/register/screens/register_screen" as Href,
  playMusic: "/features/play_music/play_music_screen" as Href,
};

export default AppRoutes;
