import React from "react";
import { Input as ShadInput } from "../ui/input";
import { FormLabel } from "../shared";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  error?: string;
  isRequired?: boolean;
}

export const Input = ({ id, label, error, isRequired, ...props }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <FormLabel htmlFor={id} isRequired={isRequired}>
        {label}
      </FormLabel>
      <ShadInput id={id} required={isRequired} {...props} />
      {error && (
        <small className="text-xs font-medium leading-none text-red-500">
          {error}
        </small>
      )}
    </div>
  );
};
