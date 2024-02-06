import React from "react";
import { Input as ShadInput } from "../../ui/input";

export interface PhoneNumberInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isRequired?: boolean;
  label?: string;
}

export const PhoneNumberInput = ({
  isRequired,
  ...props
}: PhoneNumberInputProps) => {
  return (
    <ShadInput required={isRequired} {...props} type="tel" inputMode="tel" />
  );
};
