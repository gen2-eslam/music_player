import { MaterialIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import { TouchableOpacity } from "react-native";
import CustomDrawerContent from "../../../core/common_componant/custom_drawer_content";

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={({ navigation }) => ({
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
        drawerActiveTintColor: "#000",
        drawerInactiveTintColor: "#000",
        drawerStyle: {
          backgroundColor: "#fff",
          paddingTop: 50,
          paddingBottom: 50,
          borderRadius: 20,
          width: "50%",
        },
        drawerLabelStyle: {
          fontFamily: "LexendDeca_400Regular",
        },
        drawerActiveBackgroundColor: "#f5f5f5",
        drawerInactiveBackgroundColor: "#f5f5f5",
      })}
    >
      <Drawer.Screen
        name="home/home_screen"
        options={{
          drawerLabel: "Home",
          headerTitle: "Home",
          headerTitleStyle: {
            fontFamily: "LexendDeca_400Regular",
            textAlign: "center",
          },

          drawerIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
          title: "Home",
        }}
      />
    </Drawer>
  );
}
