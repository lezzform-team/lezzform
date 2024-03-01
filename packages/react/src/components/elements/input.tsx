import React from "react";
import { Input as ShadInput } from "../ui/input";
import { cn } from "@/lib/utils";
import { ElementAdornmentType } from "@lezzform/types/dist/shared";

export type InputStyles<T = React.CSSProperties> = {
  root: T;
  input: T;
  prefixAdornment?: Partial<Record<keyof ElementAdornmentType, T>>;
  suffixAdornment?: InputStyles<T>["prefixAdornment"];
};

export type InputClassNames<T = string> = {
  root: T;
  input: T;
  prefixAdornment?: Partial<Record<keyof ElementAdornmentType, T>>;
  suffixAdornment?: InputClassNames<T>["prefixAdornment"];
};

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  isRequired?: boolean;
  label?: string;
  styles?: Partial<InputStyles>;
  classNames?: Partial<InputClassNames>;
  prefixAdornment?: Partial<
    Record<keyof ElementAdornmentType, React.JSX.Element>
  >;
  suffixAdornment?: Partial<
    Record<keyof ElementAdornmentType, React.JSX.Element>
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
        "lf-flex lf-items-center lf-h-10 lf-w-full lf-rounded-md lf-border lf-border-input lf-bg-background lf-text-sm file:lf-border file:lf-border-border file:lf-border-solid file:lf-rounded file:lf-outline-none file:lf-shadow-none file:lf-bg-muted file:lf-text-sm file:lf-font-medium file:lf-px-2 placeholder:lf-text-muted-foreground disabled:lf-cursor-not-allowed disabled:lf-opacity-50",
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
        required={isRequired}
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
