import React from "react";
import { Textarea } from "../ui/textarea";
import { FormLabel } from "../shared";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id?: string;
  label?: string;
  error?: string;
  isRequired?: boolean;
}

export const TextArea = ({ id, label, error, isRequired, ...props }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <FormLabel htmlFor={id} isRequired={isRequired}>
        {label}
      </FormLabel>
      <Textarea id={id} required={isRequired} {...props} />

      {error && (
        <small className="text-xs font-medium leading-none text-red-500">
          {error}
        </small>
      )}
    </div>
  );
};
