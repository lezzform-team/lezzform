import React from 'react';
import {Button as UIButton, ButtonProps as UIButtonProps} from '../ui/button';

export interface ButtonProps extends UIButtonProps {
  isLoading?: boolean;
}

const Button = ({isLoading, children, ...props}: ButtonProps) => {
  return <UIButton {...props}>{isLoading ? 'Loading...' : children}</UIButton>;
};
Button.displayName = 'Button';

export {Button};
