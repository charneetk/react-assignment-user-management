import React, { useState } from "react";
import * as yup from "yup";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import InputText from "../components/formComponents/InputText";
import Button from "../components/formComponents/Button";
import { customClasses } from "../utils/constant";
import { RegisterForm } from "../interfaces/LoginForm";
import { useAuth } from "../contexts/AuthProvider";
import { useForm, FormProvider } from "react-hook-form";

const registerSchema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});

export const Register: React.FC = () => {
  const { registerUser, loading } = useAuth();

  const methods = useForm<RegisterForm>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(registerSchema),
  });

  return (
    <FormProvider {...methods}>
      <div className={customClasses.pageBody}>
        <div className={customClasses.formContainer}>
          <h2 className={customClasses.formHeading}>Create your account 🔐</h2>
          <form onSubmit={methods.handleSubmit(registerUser)}>
            <InputText
              type="text"
              label="Username"
              name="username"
              placeholder="Your username"
            />

            <InputText
              type="text"
              label="Email"
              name="email"
              placeholder="Your email"
            />

            <InputText
              type="password"
              label="Password"
              name="password"
              placeholder="Your password"
            />

            <InputText
              label="Confirm Password"
              type="password"
              name="confirmPassword"
            />

            <Button type="submit" disabled={loading}>
              {loading && (
                <span className={customClasses.loadingSpinner}></span>
              )}
              Submit
            </Button>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};
