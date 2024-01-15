import React, {useMemo} from 'react';
import {InputProps, Input as UIInput} from '../ui/input';
import {StyleSheet} from 'react-native';

interface Props extends InputProps {}

const TextArea = ({...props}: Props) => {
  const style = useMemo(() => {
    return StyleSheet.create({
      TextArea: {
        color: 'black',
        height: 100,
        textAlignVertical: 'top',
      },
    });
  }, []);

  return (
    <UIInput style={style.TextArea} {...props} multiline numberOfLines={4} />
  );
};
TextArea.displayName = 'TextArea';

export {TextArea};
