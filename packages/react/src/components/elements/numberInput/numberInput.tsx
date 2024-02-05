import React from "react";
import { Input as ShadInput } from "../../ui/input";
import { NumberInputStepper } from "./stepper";

export interface NumberInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isRequired?: boolean;
  label?: string;
}

export const NumberInput = ({ isRequired, ...props }: NumberInputProps) => {
  return (
    <ShadInput
      required={isRequired}
      {...props}
      type="number"
      pattern="[0-9]*"
      inputMode="tel"
    />
  );
};

NumberInput.Stepper = NumberInputStepper;
