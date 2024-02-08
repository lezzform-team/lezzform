import { ButtonProps, Button as ShadButton } from "../ui/button";
import { Loader2 } from "lucide-react";

export interface ButtonStyles {
  root: React.CSSProperties;
}

export interface ButtonClassNames {
  root: string;
}

interface Props extends ButtonProps {
  isLoading?: boolean;
  styles?: Partial<ButtonStyles>;
  classNames?: Partial<ButtonClassNames>;
}

export const Button = ({
  id,
  children,
  isLoading,
  disabled,
  classNames,
  styles,
  ...props
}: Props) => {
  return (
    <ShadButton
      id={id}
      className={classNames?.root}
      disabled={disabled || isLoading}
      style={styles?.root}
      {...props}
    >
      {isLoading && (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      )}

      {!isLoading && children}
    </ShadButton>
  );
};
