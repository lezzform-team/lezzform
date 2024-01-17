import React from 'react';
import {InputProps, Input as UIInput} from '../ui/input';

interface Props extends InputProps {
  label?: string;
  name?: string;
}

const Input = ({...props}: Props) => {
  return <UIInput {...props} />;
};
Input.displayName = 'Input';

export {Input};
