import React from "react";
import { Textarea } from "../ui/textarea";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id?: string;
  label?: string;
  error?: string;
}

export const TextArea = ({ id, label, error, ...props }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium leading-none">
        {label}
      </label>
      <Textarea id={id} {...props} />

      {error && (
        <small className="text-xs font-medium leading-none text-red-500">
          {error}
        </small>
      )}
    </div>
  );
};
