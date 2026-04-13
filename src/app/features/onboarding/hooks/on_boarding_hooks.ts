import { AsyncStorageService } from "@/core/service/local_data_base/async_storage_service";
import { LocalDataKeys } from "@/core/service/local_data_base/local_data_keys";
import AppRoutes from "@/core/utils/app_routes";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function useOnBoarding() {
  const router = useRouter();
  useEffect(() => {
    async function checkNavigation() {
      const loggedIn = await isUserLoggedIn();
      if (loggedIn) {
        router.replace(AppRoutes.home);
        return;
      }

      const firstTime = await isFirstTime();
      if (!firstTime) {
        router.replace(AppRoutes.login);
      }
    }
    checkNavigation();
  }, [router]);

  const setOnBoardingDone = async () => {
    await AsyncStorageService.saveData(LocalDataKeys.onBoarding, "true");
    router.replace(AppRoutes.login);
  };

  const getOnBoardingDone = async () => {
    return (
      (await AsyncStorageService.getData(LocalDataKeys.onBoarding)) ?? "false"
    );
  };

  const isFirstTime = async () => {
    const status = await getOnBoardingDone();
    return status === "false";
  };

  const isUserLoggedIn = async () => {
    const token = await AsyncStorageService.getData(LocalDataKeys.accessToken);
    return token !== null;
  };

  return {
    setOnBoardingDone,
  };
}
