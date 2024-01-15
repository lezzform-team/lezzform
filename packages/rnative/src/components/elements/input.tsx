import React, {useMemo} from 'react';
import {InputProps, Input as UIInput} from '../ui/input';
import {StyleSheet} from 'react-native';

interface Props extends InputProps {}

const Input = ({...props}: Props) => {
  const style = useMemo(() => {
    return StyleSheet.create({
      Input: {
        color: 'black',
      },
    });
  }, []);

  return <UIInput style={style.Input} {...props} />;
};
Input.displayName = 'Input';

export {Input};
