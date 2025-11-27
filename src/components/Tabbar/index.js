import React, {Component} from 'react';
import {Image, Platform , View, Text } from 'react-native';
import colors from 'colors';
import vari from 'variables/platform'
export default class Tabbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {label, focused, srcActive, srcDeactive} = this.props;
    return (
      <View  style = {{ height: vari.height / 14 , justifyContent :'center' , alignItems :'center'}} >
        <Image
          resizeMode="contain"
          style={{
            tintColor: focused ? colors.blue3 : '#313338',
            width: vari.width/18,
            height: vari.width/18,
            marginBottom: 5,
            marginTop: 5,
          }}
          source={focused ? srcDeactive : srcActive}
        />
        <Text
          
          style={{
            color: focused ? colors.blue3 : '#313338',
            textAlign: 'center',
            fontSize : 10
          }}>
          {label}
        </Text>
      </View>
    );
  }
}
