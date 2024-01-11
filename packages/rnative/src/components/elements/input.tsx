import React from 'react';
import {Input as UIInput} from '../ui/input';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({input: {color: 'red'}});

const Input = () => {
  return <UIInput style={style.input} />;
};
Input.displayName = 'Input';

export {Input};
