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
export default ({text = 'msg run', width= Dimensions.get('window').width, height= Dimensions.get('window').height}) => {
  
  const getXYZ = React.useRef(
    new Animated.ValueXY({x: width - width * 0.24, y: height - 30}),
  ).current;
  const [playing, setPlaying] = React.useState(true);
  const runXy = () => {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(getXYZ, {
          toValue: {x: 0, y: 0},
          duration: 4000,
          useNativeDriver: false,
          // delay: 2000
        }),
        Animated.timing(getXYZ, {
          toValue: {x: width - width * 0.22, y: height - 30},
          duration: 4000,
          useNativeDriver: false,
        }),
      ]),
    );
  };
  React.useEffect(() => {
    runXy().start();
  }, []);

  const onPauseAnim = () => {
    if (playing) {
      runXy().stop();
      setPlaying(false);
    } else {
      runXy().start();
      setPlaying(true);
    }
  };
  return (
    <View style={{position: 'absolute'}}>
      <Animated.Text style={[styles.text, getXYZ.getLayout()]}>
        {text}
      </Animated.Text>
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
    color: colors.grey1,
  },
  wrap: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00000040',
  },
});
