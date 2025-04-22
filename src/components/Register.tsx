import React, { useState } from "react";
import * as yup from "yup";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { User } from "../interfaces/IUser";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputText from "./formComponents/TextInput";
import Button from "./formComponents/Button";
import { customClasses } from "../utils/constant";
import { RegisterForm } from "../interfaces/LoginForm";
import { registerUser } from "../services/auth.service";

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
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  let navigate: NavigateFunction = useNavigate();

  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(registerSchema),
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isDirty, isValid } = formState;

  const handleRegister = async (data: RegisterForm) => {
    setMessage("");
    setLoading(true);

    registerUser(data).then(
      (response) => {
        setMessage(response.data);
        setSuccessful(true);
        setLoading(false);
        reset();
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
      {successful && (
        <div className="mb-4 p-3 text-green-800 bg-green-100 border border-green-300 rounded">
          ✅ Registration successful! Login To Continue
        </div>
      )}
      <div className={customClasses.formContainer}>
        <h2 className={customClasses.formHeading}>Create your account 🔐</h2>
        <form onSubmit={handleSubmit(handleRegister)}>
          <InputText
            type="text"
            label="Username"
            name="username"
            placeholder="Your username"
            register={register("username")}
            error={errors.username}
          />

          <InputText
            type="text"
            label="Email"
            name="email"
            placeholder="Your email"
            register={register("email")}
            error={errors.email}
          />

          <InputText
            type="password"
            label="Password"
            name="password"
            placeholder="Your password"
            register={register("password")}
            error={errors.password}
          />

          <InputText
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            register={register("confirmPassword")}
            error={errors.confirmPassword}
          />

          <Button type="submit" disabled={!isDirty || !isValid || loading}>
            {loading && <span className={customClasses.loadingSpinner}></span>}
            Submit
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
