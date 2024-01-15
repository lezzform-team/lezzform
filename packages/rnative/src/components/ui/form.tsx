import * as React from 'react';

import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form';
import {StyleSheet, Text, TextProps, View, ViewProps} from 'react-native';
import {Label} from './label';
import {useColors} from '../../hooks/useColors';
import {useTextSize} from '../../hooks/useTextSize';

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{name: props.name}}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const {getFieldState, formState} = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const {id} = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

const FormItem = React.forwardRef<View, ViewProps>(({...props}, ref) => {
  const id = React.useId();

  const style = React.useMemo(() => {
    return StyleSheet.create({
      FormItem: {
        gap: 8,
        ...((props.style as object) ?? {}),
      },
    });
  }, [props.style]);

  return (
    <FormItemContext.Provider value={{id}}>
      <View ref={ref} {...props} style={style.FormItem} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label> & {
    isRequired?: boolean;
  }
>(({isRequired, children, ...props}, ref) => {
  const colors = useColors();
  const {error} = useFormField();

  const style = React.useMemo(
    () =>
      StyleSheet.create({
        Asterisk: {fontSize: 12, color: colors.destructive},
        FormLabel: {
          color: error ? colors.destructive : colors.foreground,
          ...((props.style as object) ?? {}),
        },
      }),
    [colors.destructive, colors.foreground, error, props.style],
  );

  return (
    <Label ref={ref} {...props} style={{...style.FormLabel}}>
      {children} {isRequired && <Text style={style.Asterisk}>*</Text>}
    </Label>
  );
});
FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({...props}, ref) => {
  const {error, formItemId, formDescriptionId, formMessageId} = useFormField();

  return (
    <View
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef<Text, TextProps>(({...props}, ref) => {
  const {formDescriptionId} = useFormField();

  const textSize = useTextSize();
  const colors = useColors();

  const style = React.useMemo(
    () =>
      StyleSheet.create({
        FormDescription: {
          fontSize: textSize.sm,
          color: colors.mutedForeground,
          ...((props.style as object) ?? {}),
        },
      }),
    [colors.mutedForeground, props.style, textSize.sm],
  );

  return (
    <Text
      ref={ref}
      id={formDescriptionId}
      {...props}
      style={style.FormDescription}
    />
  );
});
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<Text, TextProps>(
  ({children, ...props}, ref) => {
    const {error, formMessageId} = useFormField();
    const body = error ? String(error?.message) : children;

    const textSize = useTextSize();
    const colors = useColors();

    const style = React.useMemo(
      () =>
        StyleSheet.create({
          FormDescription: {
            fontSize: textSize.sm,
            color: colors.destructive,
            ...((props.style as object) ?? {}),
          },
        }),
      [colors.destructive, props.style, textSize.sm],
    );

    if (!body) {
      return null;
    }

    return (
      <Text
        ref={ref}
        id={formMessageId}
        children={body}
        {...props}
        style={style.FormDescription}
      />
    );
  },
);
FormMessage.displayName = 'FormMessage';

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
