import * as React from 'react';

import {StyleSheet, Text, TextProps} from 'react-native';

export interface LabelProps extends TextProps {}

const style = StyleSheet.create({
  Label: {
    lineHeight: 0,
    fontSize: 14,
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
