import React from "react";
import { Input as ShadInput } from "../../ui/input";
import { cn } from "@/lib/utils";

export interface PhoneNumberInputStyles {
  root: React.CSSProperties;
}

export interface PhoneNumberInputClassNames {
  root: string;
}

export interface PhoneNumberInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isRequired?: boolean;
  label?: string;
  styles?: Partial<PhoneNumberInputStyles>;
  classNames?: Partial<PhoneNumberInputClassNames>;
}

export const PhoneNumberInput = ({
  styles,
  classNames,
  ...props
}: PhoneNumberInputProps) => {
  return (
    <ShadInput
      className={cn(classNames?.root)}
      style={styles?.root}
      {...props}
      type="tel"
      inputMode="tel"
    />
  );
};
