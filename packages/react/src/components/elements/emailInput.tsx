import React from "react";
import { Input } from ".";
import { InputWithAdornmentProps } from "@/types";

interface Props
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputWithAdornmentProps {
  isRequired?: boolean;
  label?: string;
}

export const EmailInput = ({
  styles,
  classNames,
  prefixAdornment,
  suffixAdornment,
  ...props
}: Props) => {
  return (
    <Input
      prefixAdornment={prefixAdornment}
      suffixAdornment={suffixAdornment}
      styles={styles}
      classNames={classNames}
      {...props}
      type="email"
    />
  );
};
