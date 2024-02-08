import React from "react";
import { Input as ShadInput } from "../ui/input";

export interface InputStyles {
  root: React.CSSProperties;
}

export interface InputClassNames {
  root: string;
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  isRequired?: boolean;
  label?: string;
  styles?: Partial<InputStyles>;
  classNames?: Partial<InputClassNames>;
}

export const Input = ({ isRequired, styles, classNames, ...props }: Props) => {
  return (
    <ShadInput
      required={isRequired}
      style={styles?.root}
      className={classNames?.root}
      {...props}
    />
  );
};
