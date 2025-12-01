import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native-size-scaling';
import colors from 'colors';
import RouterService from 'container/Router/RouterService';
import { useNavigation } from '@react-navigation/native';
const BtnLogin = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('LoginScreen')}
      style={{
        padding: 10,
        backgroundColor: colors.black2,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: 'white', fontSize: 16 }}>ĐĂNG NHẬP</Text>
    </TouchableOpacity>
  );
};

export default BtnLogin;
