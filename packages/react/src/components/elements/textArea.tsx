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

export const TextArea = ({
  isRequired,
  styles,
  classNames,
  ...props
}: Props) => {
  return (
    <Textarea
      required={isRequired}
      className={classNames?.root}
      style={styles?.root}
      {...props}
    />
  );
};
