import React from "react";
import { Input as ShadInput } from "../ui/input";
import { cn } from "@/lib/utils";
import { InputWithAdornmentProps } from "@/types";

interface Props
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputWithAdornmentProps {
  isRequired?: boolean;
  label?: string;
}

export const Input = ({
  styles,
  classNames,
  prefixAdornment,
  suffixAdornment,
  ...props
}: Props) => {
  return (
    <div
      className={cn(
        "lf-flex lf-items-center lf-h-10 lf-w-full lf-rounded-md lf-border lf-border-input lf-bg-background lf-text-sm file:lf-border file:lf-border-border file:lf-border-solid file:lf-rounded file:lf-outline-none file:lf-shadow-none file:lf-bg-muted file:lf-text-sm file:lf-font-medium file:lf-px-2 placeholder:lf-text-muted-foreground disabled:lf-cursor-not-allowed disabled:lf-opacity-50 focus-within:lf-outline-none  focus-within:lf-ring-2 focus-within:lf-ring-ring focus-within:lf-ring-offset-2",
        !prefixAdornment && "lf-pl-3",
        !suffixAdornment && "lf-pr-3",
        classNames?.root,
      )}
      style={styles?.root}
    >
      {Boolean(prefixAdornment?.text) && (
        <div
          className={cn(
            "lf-h-full lf-bg-muted lf-text-muted-foreground lf-px-3 lf-border-r lf-rounded-l-md lf-border-r-input lf-flex lf-items-center lf-justify-start",
            classNames?.prefixAdornment?.text,
          )}
          style={styles?.prefixAdornment?.text}
        >
          {prefixAdornment?.text}
        </div>
      )}
      {Boolean(prefixAdornment?.icon) && (
        <div
          className={cn("lf-px-3", classNames?.prefixAdornment?.icon)}
          style={styles?.prefixAdornment?.icon}
        >
          {prefixAdornment?.icon}
        </div>
      )}

      <ShadInput
        style={styles?.input}
        className={cn(
          "lf-border-0 focus-visible:lf-outline-none focus-visible:lf-ring-0 focus-visible:lf-ring-offset-0 lf-px-0 lf-py-0 lf-h-full lf-rounded-none",
          classNames?.input,
        )}
        {...props}
      />

      {Boolean(suffixAdornment?.icon) && (
        <div
          className={cn("lf-px-3", classNames?.suffixAdornment?.icon)}
          style={styles?.suffixAdornment?.icon}
        >
          {suffixAdornment?.icon}
        </div>
      )}
      {Boolean(suffixAdornment?.text) && (
        <div
          className={cn(
            "lf-h-full lf-bg-muted lf-text-muted-foreground lf-px-2 lf-border-l lf-rounded-r-md lf-border-l-input lf-flex lf-items-center lf-justify-start",
            classNames?.suffixAdornment?.text,
          )}
          style={styles?.suffixAdornment?.text}
        >
          {suffixAdornment?.text}
        </div>
      )}
    </div>
  );
};
