import React from 'react';

import {StyleSheet, View, ViewProps} from 'react-native';
import {colors} from '../../themes/colors';

export interface SeparatorProps extends ViewProps {}

const Separator = ({...props}: SeparatorProps) => {
  return <View style={style.Separator} {...props} />;
};
Separator.displayName = 'Separator';

const style = StyleSheet.create({
  Separator: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.muted,
  },
});

export {Separator};
