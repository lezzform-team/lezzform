import React from "react";
import { Textarea } from "../ui/textarea";

export interface TextAreaStyles {
  root: React.CSSProperties;
}

export interface TextAreaClassNames {
  root: string;
}

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isRequired?: boolean;
  label?: string;
  styles?: Partial<TextAreaStyles>;
  classNames?: Partial<TextAreaClassNames>;
}

export const TextArea = ({ styles, classNames, ...props }: Props) => {
  return (
    <Textarea className={classNames?.root} style={styles?.root} {...props} />
  );
};
