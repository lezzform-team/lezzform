import { ButtonProps, Button as ShadButton } from "../ui/button";
import { Loader2 } from "lucide-react";

interface Props extends ButtonProps {
  isLoading?: boolean;
}

export const Button = ({
  id,
  children,
  isLoading,
  disabled,
  ...props
}: Props) => {
  return (
    <ShadButton id={id} disabled={disabled || isLoading} {...props}>
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
