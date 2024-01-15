import React from 'react';
import {Button as RNButton, ButtonProps as RNButtonProps} from 'react-native';

export interface ButtonProps extends RNButtonProps {
  isLoading?: boolean;
}

const Button = ({isLoading, ...props}: ButtonProps) => {
  return <RNButton {...props} title={isLoading ? 'Loading...' : props.title} />;
};
Button.displayName = 'Button';

export {Button};
