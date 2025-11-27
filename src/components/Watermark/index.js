import * as React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Image,
  View,
  StyleSheet,
  Text,
  Easing,
  Animated,
} from 'react-native';
import {scale} from 'react-native-size-scaling';
import colors from 'variables/colors';
// const {width, height} = Dimensions.get('window');
export const Watermark = ({
  text = '12313',
  width = Dimensions.get('window').width,
  height = Dimensions.get('window').height,
  duration = 7500,
  fontSize,
  timeAppear,
  opacity,
}) => {
  const getX = React.useRef(new Animated.Value(width / 2)).current;
  // const getY = React.useRef(new Animated.Value(height / 2)).current;
  const runX = () => {
    getX.setValue(1);
    Animated.timing(getX, {
      toValue: 0,
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => runX());

    return () => {
      new AbortController().abort;
    };
  };
  // const runX = () => {
  //   getX.setValue(Math.random() * width);
  //   Animated.timing(getX, {
  //     toValue: Math.random() * width,
  //     duration: duration,
  //     easing: Easing.linear,
  //     useNativeDriver: false,
  //   }).start(() => runX());
  // };

  // const runY = () => {
  //   getY.setValue(Math.random() * height);
  //   Animated.timing(getY, {
  //     toValue: Math.random() * height,
  //     duration: duration,
  //     easing: Easing.linear,
  //     useNativeDriver: false,
  //   }).start(() => runY());
  // };

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      runX();
    }, timeAppear);

    return () => clearTimeout(timeoutId);
  }, []);

  const moveXloop = getX.interpolate({
    inputRange: [0, 1],
    //Speed : [-60,360]
    outputRange: [-width * 0.4, width],
  });
  return (
    <View style={{position: 'absolute', bottom: scale(10)}}>
      {/* <Animated.Text style={[styles.text, { left: moveXloop }]} >
      </Animated.Text> */}
      <Animated.Text
        style={[
          {
            left: moveXloop,
            fontSize: fontSize,
            color: colors.grey,
            opacity: opacity,
          },
        ]}>
        {text}
      </Animated.Text>
      {/* <Animated.Text
        style={{
      
          left: getX,
          top: getY,
          fontSize: fontSize,
          color: 'grey'
        }}>
        {text}
      </Animated.Text> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
  body: {
    flex: 1,
    backgroundColor: '#3ad6f1',
  },
  text: {
    fontSize: scale(14),
    color: colors.grey,
  },
  wrap: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00000040',
  },
});
