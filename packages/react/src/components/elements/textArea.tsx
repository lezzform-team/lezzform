import React from "react";
import { Textarea } from "../ui/textarea";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isRequired?: boolean;
  label?: string;
}

export const TextArea = ({ isRequired, ...props }: Props) => {
  return <Textarea required={isRequired} {...props} />;
};
