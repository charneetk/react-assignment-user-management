import React from "react";
import { customClasses } from "../utils/constant";

type ErrorMessageProps = {
  message?: string | null;
  className?: string;
};

const ErrorComponent: React.FC<ErrorMessageProps> = ({
  message,
  className,
}) => {
  if (!message) return null;

  return <p className={customClasses.errorComponent}>{message}</p>;
};

export default ErrorComponent;
