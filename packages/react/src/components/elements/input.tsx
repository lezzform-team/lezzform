import React from "react";
import { Input as ShadInput } from "../ui/input";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  error?: string;
}

export const Input = ({ id, label, error, ...props }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium leading-none">
        {label}
      </label>
      <ShadInput id={id} {...props} />
      {error && (
        <small className="text-xs font-medium leading-none text-red-500">
          {error}
        </small>
      )}
    </div>
  );
};
