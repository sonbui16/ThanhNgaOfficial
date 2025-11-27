import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { StyleSheet, isTablet, scale } from 'react-native-size-scaling';
import colors from 'colors';

class BtnLogin extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('LoginScreen')}
        style={styles.touch1}
      >
        <Text style={styles.txt3}>ĐĂNG NHẬP</Text>
      </TouchableOpacity>
    );
  }
}

export default BtnLogin;
const styles = StyleSheet.create({
  touch1: {
    padding: 10,
    backgroundColor: colors.black2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt3: {
    color: 'white',
    fontSize: 16,
  },
});
