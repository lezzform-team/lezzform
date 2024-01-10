import * as React from 'react';
import {TextInput, TextInputProps} from 'react-native';

export interface InputProps extends TextInputProps {}

const Input = React.forwardRef<TextInput, InputProps>((props, ref) => {
  return <TextInput ref={ref} {...props} />;
});
Input.displayName = 'Input';

export {Input};
