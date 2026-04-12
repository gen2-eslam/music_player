import CustomListTile from "@/core/common_componant/custom_list_tile";
import { CustomTextFormField } from "@/core/common_componant/custom_text_form_field";
import { RedButtonWithArrow } from "@/core/common_componant/red_button_with_arrow";
import AppColor from "@/core/utils/app_color";
import AppFontsFamily from "@/core/utils/app_fonts";
import AppRoutes from "@/core/utils/app_routes";
import { LockIcon } from "@/core/utils/icons/lock_icon";
import { PersonIcon } from "@/core/utils/icons/person_icon";
import { Link } from "expo-router";

import { StyleSheet, Text } from "react-native";
import { Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  return (
    <SafeAreaView style={styleSheet.container}>
      <Text style={styleSheet.title}>Welcome Back</Text>
      <Text style={styleSheet.description}>Where Sound Comes Alive</Text>{" "}
      <Divider style={{ height: 20 }} />
      <CustomListTile
        title="Log In"
        description="Enter Your Credentials to continue"
      />
      <Divider style={styleSheet.divider} />
      <Divider style={{ height: 20 }} />
      <CustomTextFormField
        title="Email"
        perfixIcon={<PersonIcon />}
        placeholder="Email Address"
        value="fares"
        onChangeText={() => {}}
        error="fares"
      />
      <CustomTextFormField
        title="Password"
        perfixIcon={<LockIcon />}
        placeholder="Password"
        value="sssssssssssssssssssss"
        isPassword={true}
        onChangeText={() => {}}
      />
      <Divider style={{ height: 20 }} />
      <RedButtonWithArrow route={AppRoutes.home} />
      <Text style={styleSheet.signUpText}>
        Don't have an account?{" "}
        <Link href={AppRoutes.signUp}>
          <Text style={styleSheet.signUpText}>Sign Up</Text>
        </Link>
      </Text>
    </SafeAreaView>
  );
}

const styleSheet = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontFamily: AppFontsFamily.bold,
    textAlign: "center",
    marginTop: 20,
    color: AppColor.darkGray,
  },
  description: {
    fontSize: 16,
    fontFamily: AppFontsFamily.semiBold,
    textAlign: "center",
    color: AppColor.darkGrayOpacity,
  },
  divider: {
    backgroundColor: AppColor.dark,
    height: 1,
    width: "80%",
    marginTop: 20,
  },
  input: {
    width: "80%",
    marginTop: 20,
    borderColor: AppColor.red,
  },
  signUpText: {
    color: AppColor.red,
    fontFamily: AppFontsFamily.bold,
  },
});
