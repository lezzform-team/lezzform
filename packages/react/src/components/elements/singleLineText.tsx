import React from "react";
import { Input } from "../ui/input";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  error?: string;
}

export const SingleLineText = ({ id, label, error, ...props }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium leading-none">
        {label}
      </label>
      <Input id={id} {...props} />
      {error && (
        <small className="text-sm font-medium leading-none text-red-500">
          {error}
        </small>
      )}
    </div>
  );
};
