import React from 'react';

import {StyleSheet, View, ViewProps} from 'react-native';
import {rem} from '../../utils/helper';

export interface LezzformContainerProps extends ViewProps {}

const LezzformContainer = ({children}: LezzformContainerProps) => {
  return <View style={style.LezzformContainer}>{children}</View>;
};
LezzformContainer.displayName = 'LezzformContainer';

const style = StyleSheet.create({
  LezzformContainer: {
    width: '100%',
    gap: rem`0.5`,
  },
});

export {LezzformContainer};
