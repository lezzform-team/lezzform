import React, {ReactNode} from 'react';
import {
  ArrayPath,
  FieldArray,
  FieldValues,
  UseFieldArrayReturn,
  useFieldArray,
  useFormContext,
} from 'react-hook-form';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../themes/colors';
import {spacing} from '../../../themes/spacing';
import {textSize} from '../../../themes/textSize';
import {rem} from '../../../utils/helper';

export interface RepeaterGroupWrapperProps<T extends FieldValues> {
  children: (props: {
    name: ArrayPath<T>;
    field: UseFieldArrayReturn<T, ArrayPath<T>, '_key'>;
  }) => ReactNode | undefined;
  name: ArrayPath<T>;
}

function RepeaterGroupWrapperComponent<T extends FieldValues>({
  children,
  name,
}: RepeaterGroupWrapperProps<T>) {
  const {control} = useFormContext<T>();
  const field = useFieldArray({
    name,
    control,
    keyName: '_key',
  });

  return (
    <View style={style.Wrapper}>
      {children({name, field})}
      <View style={style.AddItemButtonWrapper}>
        <Pressable
          style={style.AddItemButton}
          android_ripple={{color: colors.accent}}
          onPress={() =>
            field.insert(field.fields.length, {} as FieldArray<T, ArrayPath<T>>)
          }>
          <Text style={style.AddItemButtonText}>Add more item</Text>
        </Pressable>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  AddItemButton: {
    borderRadius: spacing.radius - 2,
    height: rem`2.25`,
    paddingHorizontal: rem`0.75`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  AddItemButtonText: {
    color: colors.mutedForeground,
    fontSize: textSize.sm,
  },
  AddItemButtonWrapper: {
    marginTop: rem`0.25`,
  },
  Wrapper: {
    width: '100%',
    gap: rem`0.5`,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.radius - 2,
    borderStyle: 'dashed',
    padding: rem`0.5`,
  },
});

export const RepeaterGroupWrapper =
  RepeaterGroupWrapperComponent as typeof RepeaterGroupWrapperComponent;
