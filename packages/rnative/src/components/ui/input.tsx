import {useColors} from '../../hooks/useColors';
import {useSpacing} from '../../hooks/useSpacing';
import {useTextSize} from '../../hooks/useTextSize';
import * as React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {rem} from '../../utils/helper';

export interface InputProps extends TextInputProps {}

const Input = React.forwardRef<TextInput, InputProps>((props, ref) => {
  const colors = useColors();
  const textSize = useTextSize();
  const spacing = useSpacing();

  const style = React.useMemo(
    () =>
      StyleSheet.create({
        Input: {
          fontSize: textSize.sm,
          color: colors.foreground,
          borderWidth: 1,
          borderColor: colors.input,
          paddingHorizontal: rem`0.75`,
          paddingVertical: rem`0.5`,
          borderRadius: spacing.radius,
          ...((props.style as object) ?? {}),
        },
      }),
    [colors.foreground, colors.input, props.style, spacing.radius, textSize.sm],
  );

  return <TextInput ref={ref} {...props} style={style.Input} />;
});
Input.displayName = 'Input';

export {Input};
