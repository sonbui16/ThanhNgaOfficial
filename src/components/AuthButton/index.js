import React, { Component } from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';

import colors from 'colors';
import images from 'imagesApp';
import { scale } from 'react-native-size-scaling';

import Apptext from 'src/components/Apptext';
import { Button } from '@rneui/themed';
const AuthButton = props => {
  const { loading, onPress, img, disabled, text } = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(5),
        paddingVertical: scale(15),
        marginTop: scale(20),
        backgroundColor: disabled ? '#ccc' : colors.blue3, // màu nhạt khi disabled
      }}
    >
      <Text style={{ color: 'white', fontSize: 14 }}>{text}</Text>
    </TouchableOpacity>
  );
};
AuthButton.defaultProps = {
  containerStyle: {},
  textStyle: {},
  loading: false,
};

export default AuthButton;
