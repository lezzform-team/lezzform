import React from "react";
import { InputWithAdornmentProps } from "@/types";
import { Input } from "..";

export interface PhoneNumberInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputWithAdornmentProps {
  isRequired?: boolean;
  label?: string;
}

export const PhoneNumberInput = ({
  styles,
  classNames,
  ...props
}: PhoneNumberInputProps) => {
  return (
    <Input
      styles={styles}
      classNames={classNames}
      {...props}
      type="tel"
      inputMode="tel"
    />
  );
};
