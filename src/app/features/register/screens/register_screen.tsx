import CustomListTile from "@/core/common_componant/custom_list_tile";
import { CustomTextFormField } from "@/core/common_componant/custom_text_form_field";
import { RedButtonWithArrow } from "@/core/common_componant/red_button_with_arrow";
import AppColor from "@/core/utils/app_color";
import AppFontsFamily from "@/core/utils/app_fonts";
import AppRoutes from "@/core/utils/app_routes";
import { LockIcon } from "@/core/utils/icons/lock_icon";
import { PersonIcon } from "@/core/utils/icons/person_icon";
import { Link } from "expo-router";

import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { Divider, Snackbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRegister } from "../hooks/register_hook";

export default function RegisterScreen() {
  const {
    email,
    password,
    username,
    emailValidate,
    passwordValidate,
    usernameValidate,
    error,
    success,
    loading,
    setEmail,
    setPassword,
    setUsername,
    register,
    setError,
    setSuccess,
    confirmPassword,
    confirmPasswordValidate,
    setConfirmPassword,
  } = useRegister();

  return (
    <SafeAreaView style={styleSheet.container}>
      <Text style={styleSheet.title}>Welcome Back</Text>
      <Text style={styleSheet.description}>Where Sound Comes Alive</Text>
      <Divider style={{ height: 20 }} />
      <CustomListTile
        title="Register"
        description="Enter Your Credentials to continue"
      />
      <Divider style={styleSheet.divider} />
      <Divider style={{ height: 20 }} />
      <CustomTextFormField
        title="Username"
        perfixIcon={<PersonIcon />}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        error={usernameValidate}
      />
      <CustomTextFormField
        title="Email"
        perfixIcon={<PersonIcon />}
        placeholder="Email Address"
        value={email}
        onChangeText={(text) => setEmail(text)}
        error={emailValidate}
      />
      <CustomTextFormField
        title="Password"
        perfixIcon={<LockIcon />}
        placeholder="Password"
        value={password}
        isPassword={true}
        onChangeText={(text) => setPassword(text)}
        error={passwordValidate}
      />
      <CustomTextFormField
        title="Confirm Password"
        perfixIcon={<LockIcon />}
        placeholder="Confirm Password"
        value={confirmPassword}
        isPassword={true}
        onChangeText={(text) => setConfirmPassword(text)}
        error={confirmPasswordValidate}
      />
      <Divider style={{ height: 20 }} />
      {loading ? (
        <ActivityIndicator size="large" color={AppColor.red} />
      ) : (
        <RedButtonWithArrow onPress={register} />
      )}

      <Text style={styleSheet.signUpText}>
        Already have an account?{" "}
        <Link href={AppRoutes.login} asChild>
          <Text style={styleSheet.signUpText}>Login</Text>
        </Link>
      </Text>

      <Snackbar
        visible={error.showError}
        wrapperStyle={{
          position: "absolute",
          bottom: 10,
          right: 0,
          left: 0,
        }}
        action={{
          label: "Close",
          onPress: () =>
            setError({
              emailError: "",
              usernameError: "",
              passwordError: "",
              showError: false,
            }),
          icon: "close",
        }}
        onDismiss={() =>
          setError({
            emailError: "",
            usernameError: "",
            passwordError: "",
            showError: false,
          })
        }
        duration={2000}
      >
        <Text style={{ color: AppColor.white }}>{error.emailError}</Text>
        <Text style={{ color: AppColor.white }}>{error.usernameError}</Text>
        <Text style={{ color: AppColor.white }}>{error.passwordError}</Text>
      </Snackbar>
      <Snackbar
        visible={success.showSuccess}
        wrapperStyle={{
          position: "absolute",
          bottom: 10,
          right: 0,
          left: 0,
        }}
        action={{
          label: "Close",
          onPress: () => setSuccess({ message: "", showSuccess: false }),
          icon: "close",
        }}
        onDismiss={() => setSuccess({ message: "", showSuccess: false })}
        duration={2000}
      >
        <Text style={{ color: AppColor.white }}>{success.message}</Text>
      </Snackbar>
    </SafeAreaView>
  );
}

const styleSheet = StyleSheet.create({
  container: {
    flex: 1,
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
