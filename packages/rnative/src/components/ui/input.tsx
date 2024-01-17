import {useColors} from '../../hooks/useColors';
import {useSpacing} from '../../hooks/useSpacing';
import {useTextSize} from '../../hooks/useTextSize';
import * as React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {rem} from '../../utils/helper';

export interface InputProps extends Omit<TextInputProps, 'onChange'> {
  onChange?: TextInputProps['onChangeText'];
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({onChange, onChangeText, ...props}, ref) => {
    const onChangeRef = React.useRef<InputProps['onChange']>();
    const onChangeTextRef = React.useRef<InputProps['onChangeText']>();

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
      [
        colors.foreground,
        colors.input,
        props.style,
        spacing.radius,
        textSize.sm,
      ],
    );

    React.useEffect(() => {
      if (!onChange) {
        return;
      }

      onChangeRef.current = onChange;
    }, [onChange]);

    React.useEffect(() => {
      if (!onChangeText) {
        return;
      }

      onChangeTextRef.current = onChangeText;
    }, [onChangeText]);

    const handleChangeText = React.useCallback((value: string) => {
      if (onChangeRef.current) {
        onChangeRef.current(value);
      }
      if (onChangeTextRef.current) {
        onChangeTextRef.current(value);
      }
    }, []);

    return (
      <TextInput
        ref={ref}
        {...props}
        onChangeText={handleChangeText}
        style={style.Input}
      />
    );
  },
);
Input.displayName = 'Input';

export {Input};
