import AppColor from "@/core/utils/app_color";
import AppFontsFamily from "@/core/utils/app_fonts";
import AppRoutes from "@/core/utils/app_routes";
import { MaterialIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomDrawerContent from "../../../core/common_componant/custom_drawer_content";
import PlayMusicScreen from "../play_music/play_music_screen";

const { height } = Dimensions.get("window");

export default function DrawerLayout() {
  const router = useRouter();
  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      style={{ backgroundColor: "#fff", paddingTop: 0, paddingBottom: 0 }}
    >
      <View style={{ height: height * 0.85 }}>
        <Drawer
          drawerContent={CustomDrawerContent}
          screenOptions={({ navigation }) => ({
            drawerItemStyle: {
              margin: 5,
            },
            drawerActiveBackgroundColor: AppColor.red,
            drawerInactiveBackgroundColor: "#f5f5f5",
            drawerActiveTintColor: "#fff",
            drawerInactiveTintColor: "#000",
            headerRight(props) {
              return (
                <TouchableOpacity
                  onPress={() => {
                    router.push(AppRoutes.search);
                  }}
                >
                  <MaterialIcons
                    name="search"
                    size={24}
                    color="#000"
                    style={{ margin: 15 }}
                  />
                </TouchableOpacity>
              );
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }
              >
                <MaterialIcons
                  name="menu"
                  size={24}
                  color="#000"
                  style={{ margin: 15 }}
                />
              </TouchableOpacity>
            ),

            drawerStyle: {
              backgroundColor: "#fff",
              paddingTop: 50,
              paddingBottom: 50,
              borderRadius: 20,
              width: "50%",
            },
            drawerLabelStyle: {
              fontFamily: AppFontsFamily.regular,
            },
          })}
        >
          <Drawer.Screen
            name="home/home_screen"
            options={{
              drawerLabel: "Home",
              headerTitle: "Home",

              headerTitleStyle: {
                fontFamily: AppFontsFamily.bold,
                textAlign: "center",
              },

              drawerIcon: ({ color }) => (
                <MaterialIcons name="home" size={24} color={color} />
              ),
              title: "Home",
            }}
          />
          <Drawer.Screen
            name="favorite_music/my_fav_screen"
            options={{
              drawerLabel: "My Fav",
              headerTitle: "My Fav",
              headerTitleStyle: {
                fontFamily: AppFontsFamily.bold,
                textAlign: "center",
              },

              drawerIcon: ({ color }) => (
                <MaterialIcons name="favorite" size={24} color={color} />
              ),
              title: "My Fav",
            }}
          />
        </Drawer>
      </View>

      <PlayMusicScreen />
    </SafeAreaView>
  );
}