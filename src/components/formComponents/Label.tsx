import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
  htmlFor: string;
  required?: boolean;
  className?: string;
}

const Label: React.FC<LabelProps> = ({
  text,
  htmlFor,
  required = false,
  className = "",
  ...props
}) => {
  return (
    <label htmlFor={htmlFor} className="block text-gray-300 mb-2" {...props}>
      {text}
    </label>
  );
};

export default Label;
