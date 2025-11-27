import { Text, View, Image, ScrollView, ImageBackground } from 'react-native';
import React, { useEffect } from 'react';
import CoursesPending from './CoursesPending';
import colors from 'variables/colors';
import images from 'src/assets/images';
import { scale } from 'react-native-size-scaling';
import vari from 'variables/platform';
import { SafeAreaView } from 'react-native-safe-area-context';
const HomeTab = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={images.imgb}
        style={{
          justifyContent: 'space-evenly',
          height: vari.width / 1.3,
          width: '100%',
        }}
      >
        <Text
          style={{
            color: colors.blue3,
            fontSize: scale(16),
            paddingHorizontal: 10,
            paddingTop: 10,
            fontWeight: 'bold',
          }}
        >
          Thanh Nga Academy{' '}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={images.logo}
              resizeMode="contain"
              style={{ width: '100%', height: '100%' }}
            ></Image>
          </View>
          <View style={{ flex: 2, paddingHorizontal: scale(1) }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              Chào mừng bạn đến với Thanh Nga Academy
            </Text>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 14 }}>
              Khám phá các khóa học độc quyền
            </Text>
          </View>
        </View>
      </ImageBackground>

      <ScrollView>
        <CoursesPending />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeTab;
