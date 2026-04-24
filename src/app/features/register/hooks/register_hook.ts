import AppRoutes from "@/core/utils/app_routes";
import { router } from "expo-router";
import { useState } from "react";
import { RegisterRequest } from "../data/model/register_model";
import { registerAxios } from "../data/remote_data/register_axios";

export const useRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailValidate, setEmailValidate] = useState("");
  const [passwordValidate, setPasswordValidate] = useState("");
  const [usernameValidate, setUsernameValidate] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordValidate, setConfirmPasswordValidate] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({
    message: "",
    showSuccess: false,
  });
  const [error, setError] = useState({
    emailError: "",
    usernameError: "",
    passwordError: "",
    showError: false,
  });

  const checkUsernameValidate = () => {
    let error = "";
    const usernameRegex = /^[\w.@+-]+$/;
    if (username.trim() === "") {
      error = "Username is required";
    } else if (username.length < 4) {
      error = "Username must be at least 4 characters";
    } else if (!usernameRegex.test(username)) {
      error =
        "Username must contain only letters, numbers, and @ . / + - _ only";
    }
    setUsernameValidate(error);
    return error;
  };

  const checkEmailValidate = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let error = "";
    if (email.trim() === "") {
      error = "Email is required";
    } else if (!emailRegex.test(email)) {
      error = "Email is invalid";
    }
    setEmailValidate(error);
    return error;
  };

  const checkPasswordValidate = () => {
    let error = "";
    if (password.trim() === "") {
      error = "Password is required";
    } else if (password.length < 8) {
      error = "Password must be at least 8 characters";
    }
    setPasswordValidate(error);
    return error;
  };

  const checkConfirmPasswordValidate = () => {
    let error = "";
    if (confirmPassword.trim() === "") {
      error = "Confirm Password is required";
    } else if (confirmPassword !== password) {
      error = "Confirm Password does not match";
    }
    setConfirmPasswordValidate(error);
    return error;
  };

  const checkAllValidate = () => {
    const emailError = checkEmailValidate();
    const passwordError = checkPasswordValidate();
    const usernameError = checkUsernameValidate();
    const confirmPasswordError = checkConfirmPasswordValidate();
    return (
      emailError === "" &&
      passwordError === "" &&
      usernameError === "" &&
      confirmPasswordError === ""
    );
  };
  const register = async () => {
    if (checkAllValidate()) {
      setLoading(true);
      const request: RegisterRequest = {
        email: email,
        password: password,
        username: username,
      };
      registerAxios(request)
        .then((response) => {
          if (response.status === 201) {
            setSuccess({
              message: "Register success please login",
              showSuccess: true,
            });
            setTimeout(() => {
              router.replace(AppRoutes.login);
            }, 2000);
          }
        })
        .catch((error) => {
          console.log(error);
          const data = error.response?.data || {};
          setError({
            emailError: data.email || "",
            usernameError: data.username || "",
            passwordError: data.password || "",
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
    username,
    emailValidate,
    passwordValidate,
    usernameValidate,
    confirmPassword,
    confirmPasswordValidate,
    setEmail,
    setPassword,
    setUsername,
    setConfirmPassword,
    checkEmailValidate,
    checkPasswordValidate,
    checkUsernameValidate,
    checkConfirmPasswordValidate,
    register,
    checkAllValidate,
    setError,
    setSuccess,
    success,
  };
};
