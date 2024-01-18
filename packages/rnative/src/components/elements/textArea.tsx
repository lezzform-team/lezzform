import React, {useMemo} from 'react';
import {InputProps, Input as UIInput} from '../ui/input';
import {StyleSheet} from 'react-native';

export interface TextAreaProps extends InputProps {
  label?: string;
  name?: string;
}

const TextArea = ({...props}: TextAreaProps) => {
  const style = useMemo(() => {
    return StyleSheet.create({
      TextArea: {
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
