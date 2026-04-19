import AppColor from "@/core/utils/app_color";
import AppFontsFamily from "@/core/utils/app_fonts";
import { MaterialIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import { Text, TouchableOpacity, View } from "react-native";
import CustomDrawerContent from "../../../core/common_componant/custom_drawer_content";

export default function DrawerLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 0 }}>
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
              <TouchableOpacity onPress={() => {}}>
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
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
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

      <View
        style={{
          height: 70,
          backgroundColor: AppColor.red,
          justifyContent: "center",
          alignItems: "center",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <Text>music player</Text>
      </View>
    </View>
  );
}
