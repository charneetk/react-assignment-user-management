import React from "react";

type ErrorMessageProps = {
  message?: string | null;
  className?: string;
};

const ErrorComponent: React.FC<ErrorMessageProps> = ({
  message,
  className,
}) => {
  if (!message) return null;

  return <p className={className || "error-message"}>{message}</p>;
};

export default ErrorComponent;
