import { cn } from "@/lib/utils";
import { HTMLProps } from "react";

interface Props extends HTMLProps<HTMLLabelElement> {
  isRequired?: boolean;
}

export function FormLabel({
  htmlFor,
  children,
  className,
  isRequired,
  ...props
}: Props) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    >
      {children}
      {isRequired && <span className="text-red-500 text-xs">*</span>}
    </label>
  );
}
