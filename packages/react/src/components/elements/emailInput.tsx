import React from "react";
import { Input as ShadInput } from "../ui/input";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  isRequired?: boolean;
  label?: string;
}

export const EmailInput = ({ isRequired, ...props }: Props) => {
  return <ShadInput required={isRequired} {...props} type="email" />;
};
