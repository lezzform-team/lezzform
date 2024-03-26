import React, { useMemo, useState } from "react";
import { Input } from ".";
import { Eye, EyeOff } from "lucide-react";
import { InputWithAdornmentProps } from "@/types";

interface Props
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputWithAdornmentProps {
  isRequired?: boolean;
  label?: string;
}

export const PasswordInput = ({
  styles,
  classNames,
  prefixAdornment,
  suffixAdornment,
  ...props
}: Props) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const showPasswordAdornment = useMemo<Props["suffixAdornment"]>(() => {
    if (isShowPassword)
      return {
        icon: (
          <Eye
            size={16}
            className="lf-text-muted-foreground lf-cursor-pointer"
            onClick={() => setIsShowPassword(false)}
          />
        ),
      };

    return {
      icon: (
        <EyeOff
          size={16}
          className="lf-text-muted-foreground lf-cursor-pointer"
          onClick={() => setIsShowPassword(true)}
        />
      ),
    };
  }, [isShowPassword]);

  return (
    <Input
      styles={styles}
      classNames={classNames}
      prefixAdornment={prefixAdornment}
      type={isShowPassword ? "text" : "password"}
      {...props}
      suffixAdornment={{ ...suffixAdornment, ...showPasswordAdornment }}
    />
  );
};
