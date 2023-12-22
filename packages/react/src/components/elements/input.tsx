import React from "react";
import { Input as ShadInput } from "../ui/input";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  isRequired?: boolean;
  label?: string;
}

export const Input = ({ isRequired, ...props }: Props) => {
  return <ShadInput required={isRequired} {...props} />;
};
