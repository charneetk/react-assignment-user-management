import React from "react";
import { customClasses } from "../../utils/constant";

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
    <label htmlFor={htmlFor} className={customClasses.labelText} {...props}>
      {text}
    </label>
  );
};

export default Label;
