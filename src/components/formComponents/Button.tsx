
import React from 'react';
import { customClasses } from '../../utils/constant';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>{
    children?: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'outline';
    disabled?: boolean;
    className?: string;                                               
}
const Button: React.FC<ButtonProps> = ({    
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
  ...props
}) => {
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={customClasses.buttonBase}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
