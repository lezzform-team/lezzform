import * as React from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextStyle,
} from 'react-native';
import {spacing} from '../../themes/spacing';
import {textSize} from '../../themes/textSize';
import {colors} from '../../themes/colors';
import {rem} from '../../utils/helper';

export interface ButtonProps extends PressableProps {
  variant?: Variant;
  size?: Size;
}

const defaultStyle = StyleSheet.create({
  Button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: spacing.radius - 2,
    fontSize: textSize.sm,
    fontWeight: '500',
  },
  ButtonText: {
    fontSize: textSize.sm,
    fontWeight: '500',
    color: colors.foreground,
  },
});

const variants = {
  variant: StyleSheet.create({
    default: {
      backgroundColor: colors.primary,
    },
    destructive: {
      backgroundColor: colors.destructive,
    },
    outline: {
      borderWidth: 1,
      borderColor: colors.input,
      backgroundColor: colors.background,
    },
    secondary: {
      backgroundColor: colors.secondary,
    },
    ghost: {},
    link: {},
  }),
  size: StyleSheet.create({
    default: {
      height: rem`2.5`,
      paddingHorizontal: rem`1`,
      paddingVertical: rem`0.5`,
    },
    sm: {
      height: rem`2.25`,
      paddingHorizontal: rem`0.75`,
      borderRadius: spacing.radius - 2,
    },
    lg: {
      height: rem`2.75`,
      borderRadius: spacing.radius - 2,
      paddingHorizontal: rem`2`,
    },
    icon: {
      height: rem`2.5`,
      width: rem`2.5`,
    },
  }),
};

const variantsText = {
  variant: StyleSheet.create({
    default: {
      color: colors.primaryForeground,
    },
    destructive: {
      backgroundColor: colors.destructiveForeground,
    },
    outline: {
      borderWidth: 1,
      borderColor: colors.input,
      backgroundColor: colors.background,
    },
    secondary: {
      backgroundColor: colors.secondary,
    },
    ghost: {},
    link: {},
  }),
  size: StyleSheet.create({
    default: {},
    sm: {},
    lg: {},
    icon: {},
  }),
};

type Variant = keyof (typeof variants)['variant'];
type Size = keyof (typeof variants)['size'];

const defaultVariants: {
  variant: Variant;
  size: Size;
} = {
  size: 'default',
  variant: 'default',
};

const Button = ({children, style, variant, size, ...props}: ButtonProps) => {
  const buttonVariants = React.useMemo<PressableProps['style']>(() => {
    return {
      ...defaultStyle.Button,
      ...variants.variant[variant ?? defaultVariants.variant],
      ...variants.size[size ?? defaultVariants.size],
      ...(style as object),
    };
  }, [size, style, variant]);

  const textVariatns = React.useMemo<TextStyle>(() => {
    return {
      ...defaultStyle.ButtonText,
      ...variantsText.variant[variant ?? defaultVariants.variant],
      ...variantsText.size[size ?? defaultVariants.size],
    };
  }, [size, variant]);

  return (
    <Pressable style={buttonVariants} {...props}>
      {typeof children === 'string' && (
        <Text style={textVariatns}>{children}</Text>
      )}
      {typeof children === 'object' && children}
    </Pressable>
  );
};
Button.displayName = 'Button';

export {Button};
