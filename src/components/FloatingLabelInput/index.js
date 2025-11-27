import React, {Component} from 'react';
import colors from 'colors';
import {scale} from 'react-native-size-scaling';
import {TextInput} from 'react-native-paper';
const FloatingLabelInput = types => {
  const {label, showIcon, isShowPass, ...props} = types;
  const labelInput = {
    fontSize: scale(14),
    color: colors.black,
  };
  return (
    <TextInput
      mode="outlined"
      label={label}
      outlineStyle={{borderRadius: scale(10)}}
      placeholderTextColor={'#E9E9E9'}
      autoCapitalize="none"
      {...props}
      style={labelInput}
      blurOnSubmit
      activeOutlineColor={colors.blue3}
    />
  );
};

export default FloatingLabelInput;