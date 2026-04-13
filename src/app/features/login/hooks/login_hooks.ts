import { AsyncStorageService } from "@/core/service/local_data_base/async_storage_service";
import { LocalDataKeys } from "@/core/service/local_data_base/local_data_keys";
import AppRoutes from "@/core/utils/app_routes";
import { router } from "expo-router";
import { useState } from "react";
import { LoginRequest } from "../data/model/login_data_type";
import { loginAxios } from "../data/remote_data/login_axios";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidate, setEmailValidate] = useState("");
  const [passwordValidate, setPasswordValidate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    message: "",
    showError: false,
  });

  const checkEmailValidate = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.trim() === "") {
      setEmailValidate("Email is required");
    } else if (!emailRegex.test(email)) {
      setEmailValidate("Email is invalid");
    } else {
      setEmailValidate("");
    }
  };
  const checkPasswordValidate = () => {
    if (password.trim() === "") {
      setPasswordValidate("Password is required");
    } else if (password.length < 6) {
      setPasswordValidate("Password must be at least 6 characters");
    } else {
      setPasswordValidate("");
    }
  };
  const checkAllValidate = () => {
    checkEmailValidate();
    checkPasswordValidate();
    return emailValidate === "" && passwordValidate === "";
  };
  const login = async () => {
    if (checkAllValidate()) {
      setLoading(true);
      const request: LoginRequest = {
        email: email,
        password: password,
      };
      loginAxios(request)
        .then((response) => {
          AsyncStorageService.saveData(
            LocalDataKeys.accessToken,
            response.data.access,
          );
          AsyncStorageService.saveData(
            LocalDataKeys.refreshToken,
            response.data.refresh,
          );
          setLoading(false);
          router.push(AppRoutes.home);
        })
        .catch((error) => {
          setError({
            message: error.response.data["detail"],
            showError: true,
          });

          setLoading(false);
        });
    }
  };

  return {
    loading,
    error,
    email,
    password,
    emailValidate,
    passwordValidate,
    setEmail,
    setPassword,
    checkEmailValidate,
    checkPasswordValidate,
    login,
    setError,
  };
};
