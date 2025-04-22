import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
  htmlFor: string;
  required?: boolean;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ text, htmlFor, required = false, className = "", ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block mb-1 font-medium text-gray-700 ${className}`}
      {...props}
    >
      {text}
    </label>
  );
};

export default Label;
