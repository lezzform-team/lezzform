import React from "react";
import { Input as ShadInput } from "../ui/input";
import { InputAdornmentType } from "@lezzform/types/dist/elements/input";
import { cn } from "@/lib/utils";

export type InputStyles<T = React.CSSProperties> = {
  root: T;
  input: T;
  prefixAdornment?: Partial<Record<keyof InputAdornmentType, T>>;
  suffixAdornment?: InputStyles<T>["prefixAdornment"];
};

export type InputClassNames<T = string> = {
  root: T;
  input: T;
  prefixAdornment?: Partial<Record<keyof InputAdornmentType, T>>;
  suffixAdornment?: InputClassNames<T>["prefixAdornment"];
};

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  isRequired?: boolean;
  label?: string;
  styles?: Partial<InputStyles>;
  classNames?: Partial<InputClassNames>;
  prefixAdornment?: Partial<
    Record<keyof InputAdornmentType, React.JSX.Element>
  >;
  suffixAdornment?: Partial<
    Record<keyof InputAdornmentType, React.JSX.Element>
  >;
}

export const Input = ({
  isRequired,
  styles,
  classNames,
  prefixAdornment,
  suffixAdornment,
  ...props
}: Props) => {
  const isUsingAdornment = Boolean(prefixAdornment) || Boolean(suffixAdornment);

  if (!isUsingAdornment) {
    return (
      <ShadInput
        required={isRequired}
        style={styles?.root}
        className={classNames?.root}
        {...props}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex items-center h-10 w-full rounded-md border border-lfui-input bg-lfui-background text-sm file:border file:border-lfui-border file:border-solid file:rounded file:outline-none file:shadow-none file:bg-lfui-muted file:text-sm file:font-medium file:px-2 placeholder:text-lfui-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        !prefixAdornment && "pl-3",
        !suffixAdornment && "pr-3",
        classNames?.root,
      )}
      style={styles?.root}
    >
      {Boolean(prefixAdornment?.text) && (
        <div
          className={cn(
            "h-full bg-lfui-muted text-lfui-muted-foreground px-3 border-r rounded-l-md border-r-lfui-input flex items-center justify-start",
            classNames?.prefixAdornment?.text,
          )}
          style={styles?.prefixAdornment?.text}
        >
          {prefixAdornment?.text}
        </div>
      )}
      {Boolean(prefixAdornment?.icon) && (
        <div
          className={cn("px-3", classNames?.prefixAdornment?.icon)}
          style={styles?.prefixAdornment?.icon}
        >
          {prefixAdornment?.icon}
        </div>
      )}

      <ShadInput
        required={isRequired}
        style={styles?.input}
        className={cn(
          "border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 py-0 h-full rounded-none",
          classNames?.input,
        )}
        {...props}
      />

      {Boolean(suffixAdornment?.icon) && (
        <div
          className={cn("px-3", classNames?.suffixAdornment?.icon)}
          style={styles?.suffixAdornment?.icon}
        >
          {suffixAdornment?.icon}
        </div>
      )}
      {Boolean(suffixAdornment?.text) && (
        <div
          className={cn(
            "h-full bg-lfui-muted text-lfui-muted-foreground px-2 border-l rounded-r-md border-l-lfui-input flex items-center justify-start",
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
