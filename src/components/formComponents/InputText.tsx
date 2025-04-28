// components/InputText.tsx
import React from "react";
import { FieldError } from "react-hook-form";
import { customClasses } from "../../utils/constant";
import Label from "./Label";
import { useFormContext } from "react-hook-form";
import ErrorComponent from "../ErrorComponent";

interface InputTextProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: FieldError;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: any;
  className?: string;
}

const InputText: React.FC<InputTextProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  onChange,
  value,
  className,
}) => {
  const formContext = useFormContext?.();

  const register = formContext?.register;
  const errors = formContext?.formState?.errors;
  const isInForm = !!formContext?.register;

  const error = (errors?.[name] as FieldError)?.message;
  return (
    <div className="mb-4">
      <Label htmlFor={name} text={label} />
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={`${customClasses.inputText} ${
          error ? customClasses.inputErrorBorder : customClasses.inputTextBorder
        } ${className}`}
        {...(isInForm ? register(name) : {})}
        onChange={onChange}
        value={value}
      />
      <ErrorComponent message={error} />
    </div>
  );
};

export default InputText;
