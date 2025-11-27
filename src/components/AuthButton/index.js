import React, {Component} from 'react';
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
import {scale} from 'react-native-size-scaling';

import Apptext from 'src/components/Apptext';
import {Button} from '@rneui/themed';
const AuthButton = props => {
  const {loading, onPress, img, disabled, text} = props;
  return (
    <Button
      disabled={disabled}
      color={colors.blue3}
      loading={loading}
      onPress={onPress}
      buttonStyle={{
        borderRadius: scale(5),
        padding: scale(15),
        marginTop: scale(20),
      }}>
      {!loading ? (
        <>
          <Apptext i18nKey={text} style={{color: 'white'}} />
        </>
      ) : (
        <>
          <ActivityIndicator></ActivityIndicator>
        </>
      )}
    </Button>
  );
};
AuthButton.defaultProps = {
  containerStyle: {},
  textStyle: {},
  loading: false,
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F58233'
    borderRadius: scale(30),
    padding: scale(15),
    marginTop: 20,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AuthButton;
