import React, { useState } from "react";
import { NavigateFunction, useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { login } from "../services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { customClasses } from "../utils/constant";
import InputText from "./formComponents/TextInput";
import Button from "./formComponents/Button";
import { LoginForm } from "../interfaces/LoginForm";
import { useAuth } from "../contexts/AuthProvider";

export const loginSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
});

export const Login = () => {
  const { setAuth } = useAuth();
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const { register, handleSubmit, formState } = form;
  const { errors, isDirty, isValid } = formState;

  let navigate: NavigateFunction = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleLogin = async (data: LoginForm) => {
    setMessage("");
    setLoading(true);

    login(data).then(
      (response) => {
        console.log("Login Response ", response);
        setAuth({ user: response });
        navigate("/profile");
        // window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className={customClasses.pageBody}>
      <div className={customClasses.formContainer}>
        <h2 className={customClasses.formHeading}>Log in to your account 🔐</h2>

        <form onSubmit={handleSubmit(handleLogin)}>
          <InputText
            type="text"
            label="Username"
            name="username"
            placeholder="Your username"
            register={register("username")}
            error={errors.username}
          />
          <InputText
            label="Password"
            type="password"
            name="password"
            placeholder="Your Password"
            register={register("password")}
            error={errors.password}
          />

          <Button disabled={!isDirty || !isValid || loading} type="submit">
            {loading && <span className={customClasses.loadingSpinner}></span>}
            Login
          </Button>

          {message && (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
