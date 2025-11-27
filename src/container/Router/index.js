import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RouterService from './RouterService';
import AuthStack from './AuthStack';

export default class Router extends Component {
  render() {
    return (
      <NavigationContainer ref={RouterService.refRouter}>
        <AuthStack />
      </NavigationContainer>
    );
  }
}
