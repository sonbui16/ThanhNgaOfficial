import { Text, View, Image } from 'react-native';
import React, { Component } from 'react';
import { scale } from 'react-native-size-scaling';
import images from 'imagesApp/';
import ViewBackground from 'components/ViewBackground';
import colors from 'variables/colors';

export class CancelLogin extends Component {
  render() {
    return (
      <ViewBackground
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text
          style={{
            color: colors.blue3,
            marginHorizontal: scale(20),
            fontSize: scale(14),
            textAlign: 'center',
          }}
        >
          Nội dung này chỉ dành cho học viên đã đăng nhập. Vui lòng đăng nhập để
          xem được đầy đủ nội dung của khóa học .
        </Text>
      </ViewBackground>
    );
  }
}

export default CancelLogin;
