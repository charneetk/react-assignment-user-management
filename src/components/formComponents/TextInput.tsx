// components/InputText.tsx
import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { customClasses } from '../../utils/constant';
import Label from './Label';

interface InputTextProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const InputText: React.FC<InputTextProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  register,
  error,
}) => {
  return (
    <div className="mb-4">
     <Label htmlFor={name} text={label}/>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={`${customClasses.inputText} ${
          error ? customClasses.inputErrorBorder : customClasses.inputTextBorder
        }`}
        {...register}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
    </div>
  );
};

export default InputText;
