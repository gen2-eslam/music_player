import AppColor from "@/core/utils/app_color";
import { useState } from "react";
import {
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AppFontsFamily from "../utils/app_fonts";
import EyePasswordHide from "../utils/icons/eye_password_hide";
import EyePasswordShow from "../utils/icons/eye_password_show";

export const CustomTextFormField = ({
  title,
  perfixIcon,
  placeholder,
  value,
  isPassword,
  onChangeText,
  onSubmitEditing,
  error,
  keyboardType,
}: {
  title?: string;
  perfixIcon: React.ReactNode;
  placeholder: string;
  isPassword?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={styleSheet.container}>
      {title && <Text style={styleSheet.title}>{title}</Text>}
      <View style={[styleSheet.innercontainer]}>
        <View style={styleSheet.icon}>{perfixIcon}</View>
        <TextInput
          style={isPassword ? styleSheet.passwordInput : styleSheet.input}
          placeholder={placeholder}
          placeholderTextColor={AppColor.lightGray}
          secureTextEntry={isPassword ? !showPassword : false}
          value={value}
          onSubmitEditing={onSubmitEditing}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
        />
        {isPassword && (
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyePasswordHide
                height={24}
                width={24}
                stroke={AppColor.lightGray}
              />
            ) : (
              <EyePasswordShow
                height={24}
                width={24}
                stroke={AppColor.lightGray}
              />
            )}
          </Pressable>
        )}
      </View>
      {error && <Text style={styleSheet.error}>{error}</Text>}
    </View>
  );
};

const styleSheet = StyleSheet.create({
  container: {
    width: "80%",
    marginTop: 10,
    alignItems: "flex-start",
  },
  innercontainer: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: AppColor.lightRed,
    borderColor: AppColor.red,
  },

  title: {
    fontSize: 16,

    fontFamily: AppFontsFamily.semiBold,
    textAlign: "auto",
    alignSelf: "baseline",
    color: AppColor.dark,
  },
  input: {
    width: "85%",
  },
  passwordInput: {
    width: "70%",
  },
  icon: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  suffixIcon: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontSize: 12,
    fontFamily: AppFontsFamily.regular,
    color: AppColor.red,
    marginTop: 5,
  },
});
