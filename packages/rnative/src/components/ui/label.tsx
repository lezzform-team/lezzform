import * as React from 'react';

import {StyleSheet, Text, TextProps} from 'react-native';
import {textSize} from '../../themes/textSize';

export interface LabelProps extends TextProps {}

const style = StyleSheet.create({
  Label: {
    fontSize: textSize.sm,
    color: 'black',
  },
});

const Label = React.forwardRef<Text, LabelProps>((props, ref) => {
  return (
    <Text
      ref={ref}
      {...props}
      style={{...style.Label, ...((props.style as object) ?? {})}}
    />
  );
});
Label.displayName = 'Label';

export {Label};
