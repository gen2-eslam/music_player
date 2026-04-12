import { AsyncStorageService } from "@/core/service/local_data_base/async_storage_service";
import { LocalDataKeys } from "@/core/service/local_data_base/local_data_keys";
import AppRoutes from "@/core/utils/app_routes";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export const useOnBoarding = () => {
  const router = useRouter();
  useEffect(() => {
    async function checkUser() {
      if (await isUserLoggedIn()) {
        router.replace(AppRoutes.home);
      }
    }
    async function checkOnBoarding() {
      if (await !isFirstTime()) {
        router.replace(AppRoutes.login);
      }
    }
    checkUser();
    checkOnBoarding();
  }, []);

  const setOnBoardingDone = () => {
    AsyncStorageService.saveData(LocalDataKeys.onBoarding, "true");
    router.push(AppRoutes.login);
  };

  const getOnBoardingDone = () => {
    return AsyncStorageService.getData(LocalDataKeys.onBoarding) ?? "false";
  };
  const isFirstTime = async () => {
    return (await getOnBoardingDone()) === "false";
  };
  const isUserLoggedIn = async () => {
    return (
      (await AsyncStorageService.getData(LocalDataKeys.accessToken)) !== null
    );
  };

  return {
    setOnBoardingDone,
  };
};
