import React, { useState } from "react";
import * as yup from "yup";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { customClasses } from "../utils/constant";

import { LoginForm } from "../interfaces/LoginForm";
import { useAuth } from "../contexts/AuthProvider";
import InputText from "../components/formComponents/InputText";
import Button from "../components/formComponents/Button";

export const loginSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
});

export const Login: React.FC = () => {
  const { login, loading } = useAuth();
  const methods = useForm<LoginForm>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const { errors } = methods.formState;

  const handleLogin = async (data: LoginForm) => {
    login(data);
  };

  return (
    <FormProvider {...methods}>
      <div className={customClasses.pageBody}>
        <div className={customClasses.formContainer}>
          <h1 className={customClasses.formHeading}>
            Log in to your account 🔐
          </h1>

          <form onSubmit={methods.handleSubmit(handleLogin)}>
            <InputText
              type="text"
              label="Username"
              name="username"
              placeholder="Your username"
            />
            <InputText
              label="Password"
              type="password"
              name="password"
              placeholder="Your Password"
            />

            <Button disabled={loading} type="submit">
              {loading && (
                <span className={customClasses.loadingSpinner}></span>
              )}
              Login
            </Button>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default Login;
