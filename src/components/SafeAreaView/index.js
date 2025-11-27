import React, { Component, Fragment } from 'react';
import { SafeAreaView, ImageBackground } from 'react-native';
import colors from 'colors';
import images from 'imagesApp';

export default class SafeAreaViews extends Component {
  render() {
    const { children, bgTeach } = this.props;
    return (
      <ImageBackground source={images.imgb} style={{ flex: 1 }}>
        {children}
      </ImageBackground>
    );
  }
}
