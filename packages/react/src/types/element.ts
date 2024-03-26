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

export type InputWithAdornmentProps = {
  styles?: Partial<InputStyles>;
  classNames?: Partial<InputClassNames>;
  prefixAdornment?: Partial<
    Record<keyof ElementAdornmentType, React.JSX.Element>
  >;
  suffixAdornment?: Partial<
    Record<keyof ElementAdornmentType, React.JSX.Element>
  >;
};
