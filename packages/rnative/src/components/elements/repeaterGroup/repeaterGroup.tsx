import React from 'react';
import {RepeaterGroupWrapper, RepeaterGroupWrapperProps} from './wrapper';
import {FieldValues} from 'react-hook-form';
import {Pressable, StyleSheet, View, ViewProps} from 'react-native';
import {colors} from '../../../themes/colors';
import {spacing} from '../../../themes/spacing';
import {textSize} from '../../../themes/textSize';
import {rem} from '../../../utils/helper';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface RepeaterGroupProps extends ViewProps {
  onDelete?: () => unknown;
  readonly?: boolean;
}

const RepeaterGroup = ({children, onDelete, ...props}: RepeaterGroupProps) => {
  return (
    <View style={style.RepeaterGroup} {...props}>
      {children}
      <Pressable style={style.DeleteButton} onPress={onDelete}>
        <Icon
          name="delete-outline"
          size={textSize.sm}
          color={colors.destructive}
        />
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  RepeaterGroup: {
    gap: 8,
    borderWidth: 1,
    borderColor: colors.muted,
    borderRadius: spacing.radius - 2,
    position: 'relative',
    padding: rem`0.5`,
  },
  DeleteButton: {
    backgroundColor: colors.red['100'],
    paddingHorizontal: 8,
    paddingVertical: 4,
    position: 'absolute',
    borderRadius: 4,
    top: rem`0.25`,
    right: rem`0.25`,
  },
});

RepeaterGroup.Wrapper = function <T extends FieldValues>(
  props: RepeaterGroupWrapperProps<T>,
) {
  return RepeaterGroupWrapper<T>(props);
};

export {RepeaterGroup};
