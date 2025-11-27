import React from 'react';
import { ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from 'src/assets/images';

const ViewBackground = ({ style, children }) => {
  return (
    <ImageBackground source={images.imgb} style={{ flex: 1 }}>
      <SafeAreaView style={style}>{children}</SafeAreaView>
    </ImageBackground>
  );
};

export default ViewBackground;
