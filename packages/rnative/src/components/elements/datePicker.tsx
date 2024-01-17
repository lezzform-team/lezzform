import React from 'react';

import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../themes/colors';
import {spacing} from '../../themes/spacing';
import {textSize} from '../../themes/textSize';
import {rem} from '../../utils/helper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useDisclose} from '../../hooks/useDisclose';
import {format as dateFnsFormat} from 'date-fns';

export interface DatePickerProps {
  placeholder?: string;
  value?: Date;
  onChange?: (value: Date) => unknown;
  label?: string;
  name?: string;
  readOnly?: boolean;
  disabled?: boolean;
  format?: string;
  isRequired?: boolean;
}

const DatePicker = ({
  placeholder,
  format,
  value,
  onChange,
}: DatePickerProps) => {
  const {onOpen, isOpen, onClose} = useDisclose();

  const handleConfirm = (date: Date) => {
    onChange && onChange(date);
    onClose();
  };

  return (
    <View>
      <Pressable
        style={style.DropdownButton}
        android_ripple={{color: colors.accent}}
        onPress={onOpen}>
        <Text style={style.DropdownButtonText}>
          {value ? dateFnsFormat(value, format ?? 'PPP') : placeholder ?? ''}
        </Text>
      </Pressable>
      <DateTimePickerModal
        isVisible={isOpen}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={onClose}
      />
    </View>
  );
};
DatePicker.displayName = 'DatePicker';

const style = StyleSheet.create({
  DropdownButton: {
    height: rem`2.5`,
    borderRadius: spacing.radius - 2,
    borderWidth: 1,
    borderColor: colors.input,
    backgroundColor: colors.background,
    paddingHorizontal: rem`1`,
    paddingVertical: rem`0.5`,
    width: '100%',
  },
  DropdownButtonText: {
    fontSize: textSize.sm,
    color: colors.foreground,
  },
});

export {DatePicker};
