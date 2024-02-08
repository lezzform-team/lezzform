import React from "react";
import { Input as ShadInput } from "../../ui/input";
import { NumberInputStepper } from "./stepper";
import { cn } from "@/lib/utils";

export interface NumberInputStyles {
  root: React.CSSProperties;
}

export interface NumberInputClassNames {
  root: string;
}

export interface NumberInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isRequired?: boolean;
  label?: string;
  styles?: Partial<NumberInputStyles>;
  classNames?: Partial<NumberInputClassNames>;
}

export const NumberInput = ({
  isRequired,
  styles,
  classNames,
  ...props
}: NumberInputProps) => {
  return (
    <ShadInput
      required={isRequired}
      className={cn(classNames?.root)}
      style={styles?.root}
      {...props}
      type="number"
      pattern="[0-9]*"
      inputMode="tel"
    />
  );
};

NumberInput.Stepper = NumberInputStepper;
