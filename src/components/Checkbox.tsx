import React, {
  useEffect,
  useRef,
  forwardRef,
  InputHTMLAttributes,
} from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ indeterminate = false, ...rest }, ref) => {
    const defaultRef = useRef<HTMLInputElement>(null);
    const resolvedRef = (ref ||
      defaultRef) as React.RefObject<HTMLInputElement>;

    useEffect(() => {
      if (resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate;
      }
    }, [resolvedRef, indeterminate]);

    return <input type="checkbox" ref={resolvedRef} {...rest} />;
  }
);
