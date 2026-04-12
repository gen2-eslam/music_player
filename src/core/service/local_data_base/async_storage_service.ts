import AsyncStorage from "@react-native-async-storage/async-storage";

export const AsyncStorageService = {
  saveData: async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value);
  },
  getData: async (key: string) => {
    return await AsyncStorage.getItem(key);
  },
  removeData: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },
  clearAll: async () => {
    await AsyncStorage.clear();
  },
};
