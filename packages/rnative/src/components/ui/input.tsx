import * as React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {rem} from '../../utils/helper';
import {textSize} from '../../themes/textSize';
import {colors} from '../../themes/colors';
import {spacing} from '../../themes/spacing';

export interface InputProps extends Omit<TextInputProps, 'onChange'> {
  onChange?: TextInputProps['onChangeText'];
  disabled?: boolean;
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({onChange, onChangeText, disabled, readOnly, ...props}, ref) => {
    const onChangeRef = React.useRef<InputProps['onChange']>();
    const onChangeTextRef = React.useRef<InputProps['onChangeText']>();

    const style = React.useMemo(() => {
      let additionalStyle: TextInputProps['style'] = {};

      if (disabled) {
        additionalStyle = {
          ...additionalStyle,
          backgroundColor: colors.muted,
          color: colors.mutedForeground,
        };
      }

      return StyleSheet.create({
        Input: {
          fontSize: textSize.sm,
          color: colors.foreground,
          borderWidth: 1,
          borderColor: colors.input,
          paddingHorizontal: rem`0.75`,
          paddingVertical: rem`0.5`,
          borderRadius: spacing.radius,
          ...additionalStyle,
          ...((props.style as object) ?? {}),
        },
      });
    }, [props.style, disabled]);

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
        placeholderTextColor={colors.mutedForeground}
        readOnly={readOnly || disabled}
      />
    );
  },
);
Input.displayName = 'Input';

export {Input};
