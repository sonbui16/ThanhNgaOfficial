import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {PaperProvider} from 'react-native-paper';
export class AppContainer extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <PaperProvider>
        </PaperProvider>
      </View>
    );
  }
}

export default AppContainer;
