import React from "react";
import { NumberInputStepper } from "./stepper";
import { Input } from "..";
import { ElementAdornmentType } from "@lezzform/types/dist/shared";

export type NumberInputStyles<T = React.CSSProperties> = {
  root: T;
  input: T;
  prefixAdornment?: Partial<Record<keyof ElementAdornmentType, T>>;
  suffixAdornment?: NumberInputStyles<T>["prefixAdornment"];
};

export type NumberInputClassNames<T = string> = {
  root: T;
  input: T;
  prefixAdornment?: Partial<Record<keyof ElementAdornmentType, T>>;
  suffixAdornment?: NumberInputClassNames<T>["prefixAdornment"];
};

export interface NumberInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isRequired?: boolean;
  label?: string;
  styles?: Partial<NumberInputStyles>;
  classNames?: Partial<NumberInputClassNames>;
  prefixAdornment?: Partial<
    Record<keyof ElementAdornmentType, React.JSX.Element>
  >;
  suffixAdornment?: Partial<
    Record<keyof ElementAdornmentType, React.JSX.Element>
  >;
}

export const NumberInput = ({
  styles,
  classNames,
  prefixAdornment,
  suffixAdornment,
  ...props
}: NumberInputProps) => {
  return (
    <Input
      styles={styles}
      classNames={classNames}
      prefixAdornment={prefixAdornment}
      suffixAdornment={suffixAdornment}
      {...props}
      type="number"
      pattern="[0-9]*"
      inputMode="tel"
    />
  );
};

NumberInput.Stepper = NumberInputStepper;
