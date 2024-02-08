import React from "react";
import { Input as ShadInput } from "../ui/input";

export interface EmailInputStyles {
  root: React.CSSProperties;
}

export interface EmailInputClassNames {
  root: string;
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  isRequired?: boolean;
  label?: string;
  styles?: Partial<EmailInputStyles>;
  classNames?: Partial<EmailInputClassNames>;
}

export const EmailInput = ({
  isRequired,
  styles,
  classNames,
  ...props
}: Props) => {
  return (
    <ShadInput
      required={isRequired}
      style={styles?.root}
      className={classNames?.root}
      {...props}
      type="email"
    />
  );
};
