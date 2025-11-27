import React, {useState, useRef, useEffect} from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Image,
  Platform,
  PixelRatio,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DeviceInfo from 'react-native-device-info';
import YoutubePlayer from 'react-native-youtube-iframe';
import {Slider} from '@react-native-assets/slider';
import {scale} from 'react-native-size-scaling';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import {SafeAreaView} from 'react-native-safe-area-context';

import vari from 'variables/platform';
import images from 'src/assets/images';
import {getPlayerStateIcon} from '../../DetailLearnScreen/VideoDetail/utiles';
import {PLAYER_STATES} from '../../DetailLearnScreen/VideoDetail/playStates';
import {Watermark} from 'src/components/Watermark';
var {height, width} = Dimensions.get('window');

const YoutubeDetail = ({
  checkFull,
  handleEndYoutube,
  item,
  msg,
  onPress,
  fullScreenYouTuBe,
  rate,
  onVisible,
  deviceOrientation,
  nameLesson,
}) => {
  // =================== State ===================
  const [thumbIcon, setThumbIcon] = useState();
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const playerRef = useRef();
  const [paused, setPaused] = useState(false);
  const insets = useSafeAreaInsets();
  const [isVisible, setisVisible] = useState(false);
  const [playerState, setPlayerState] = useState(-1);
  const [stateVideo, setStateVideo] = useState({
    state: 'playing',
  });
  const isIphoneX = DeviceInfo.hasNotch();
  const [opacity] = useState(new Animated.Value(0));
  // =================== Effects ===================
  useEffect(() => {
    Icon.getImageSource('circle', scale(18), 'red').then(source => {
      setThumbIcon(source);
    });
  }, []);
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const elapsed_sec = await playerRef.current?.getCurrentTime?.();
        const totalDuration = await playerRef.current?.getDuration?.();
        if (elapsed_sec != null) setElapsed(elapsed_sec);
        if (totalDuration != null) setDuration(totalDuration);
      } catch (error) {
        console.error('Error getting current time:', error);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    fadeInControls(); // 👈 Hiện control ngay khi component vừa render
  }, []);

  // =================== Player Actions ===================

  const handleEnd = () => {
    handleEndYoutube && handleEndYoutube();
  };
  const toggleControls = () => {
    opacity.stopAnimation(value => {
      setisVisible(!!value);
      return value ? fadeOutControls() : fadeInControls();
    });
  };

  const onReplay = () => {
    setIsVideoEnded(false);
    playerRef.current.seekTo(0);
    setPlayerState(PLAYER_STATES.PLAYING);
  };
  const onPaused = playerState => {
    setPaused(!paused);
  };
  const cancelAnimation = () => {
    opacity.stopAnimation(() => {
      setisVisible(true);
    });
  };
  const onPause = () => {
    const {PLAYING, PAUSED} = PLAYER_STATES;
    switch (playerState) {
      case 0: {
        cancelAnimation();
        setStateVideo({state: 'paused'});
        break;
      }
      case 1: {
        setStateVideo({state: 'playing'});
        fadeOutControls(5000);
        break;
      }
      default:
        break;
    }
    const newPlayerState = playerState === PLAYING ? PAUSED : PLAYING;
    return onPaused(newPlayerState);
  };
  const fadeInControls = (loop = true) => {
    setisVisible(true);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      delay: 0,
      useNativeDriver: false,
    }).start(() => {
      if (loop) {
        fadeOutControls(5000);
      }
    });
  };

  const formatTime = seconds => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins
        .toString()
        .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
      return `${mins.toString().padStart(2, '0')}:${secs
        .toString()
        .padStart(2, '0')}`;
    }
  };
  const fadeOutControls = (delay = 0) => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      delay,
      useNativeDriver: false,
    }).start(result => {
      if (result.finished) {
        setisVisible(false);
      }
    });
  };
  const onSeek = async seek => {
    // setPlayerState(PLAYER_STATES.LOADING);
    try {
      await playerRef.current?.seekTo(seek);
      if (isVideoEnded) {
        setIsVideoEnded(false);
        setPlayerState(PLAYER_STATES.PLAYING); // Hoặc PLAYING tuỳ ý
      }
    } catch (err) {
      console.error('Seek error', err);
    }
  };
  const handleFullScreen = () => {
    fullScreenYouTuBe && fullScreenYouTuBe();
  };
  const pressAction = isVideoEnded ? onReplay : onPause;
  const iconControl = () => {
    if (isVideoEnded) return getPlayerStateIcon(PLAYER_STATES.ENDED);
    return getPlayerStateIcon(playerState);
  };
  const tenForward = () => {
    const newTime = elapsed + 10;
    playerRef.current.seekTo(newTime);
  };
  const tenBackward = () => {
    const newTime = elapsed - 10;
    playerRef.current.seekTo(newTime);
    if (newTime < duration - 1) {
      // Nếu seek về trước cuối video
      setIsVideoEnded(false);
      setPlayerState(PLAYER_STATES.PLAYING); // Hoặc PLAYING tuỳ ý
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <YoutubePlayer
          ref={playerRef}
          playbackRate={rate?.rate}
          width={'100%'}
          height={'100%'}
          play={stateVideo.state === 'playing'}
          videoId={item?.lesson_info?.video_id}
          key={item?.lesson_info?.video_id}
          showinfo={true}
          modestbranding={true}
          rel={false}
          initialPlayerParams={{
            controls: false,
          }}
          webViewProps={{
            cacheMode: 'LOAD_NO_CACHE',
            incognito: true,
            allowsInlineMediaPlayback: true,
            mediaPlaybackRequiresUserAction: false,
          }}
          onChangeState={e => {
            console.log("sonbh11" , e );
            
            switch (e) {
              case 'playing': {
                setPlayerState(PLAYER_STATES.PLAYING);
                break;
              }
              case 'paused': {
                setPlayerState(PLAYER_STATES.PAUSED);
                break;
              }
              case 'ended': {
                setIsVideoEnded(true);
                setPlayerState(PLAYER_STATES.ENDED);
                handleEnd();
                break;
              }
              case 'unstarted':
              case 'buffering':
                setPlayerState(PLAYER_STATES.LOADING);
                break;
              default:
                break;
            }
            // if (e === 'unstarted') {
            // } else if (e === 'playing') {
            //   if (!isVideoEnded) {
            //     setPlayerState(PLAYER_STATES.PLAYING);
            //   }
            // } else if (e === 'paused') {
            //   if (!isVideoEnded) {
            //     setPlayerState(PLAYER_STATES.PAUSED);
            //   }
            // } else if (e === 'ended') {
            //   setIsVideoEnded(true);
            //   setPlayerState(PLAYER_STATES.ENDED);
            // }
          }}
        />
        <Watermark
          height={
            checkFull
              ? Dimensions.get('screen').width
              : Dimensions.get('screen').height
          }
          width={
            checkFull
              ? Dimensions.get('screen').height * 1.2
              : Dimensions.get('screen').width
          }
          duration={checkFull ? 10000 : 7000}
          text={msg}
        />
      </SafeAreaView>

      <TouchableWithoutFeedback onPress={toggleControls}>
        <View style={StyleSheet.absoluteFill}>
          <Animated.View
            style={[
              {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                overflow: 'hidden',
              },
              {opacity},
            ]}>
            {isVisible && (
              <View style={{flex: 1}}>
                <View
                  style={[
                    {
                      alignSelf: 'stretch',
                      flex: 1,
                    },
                  ]}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 10,
                    }}>
                    {deviceOrientation === 'PORTRAIT' ||
                    deviceOrientation === 'UNKNOWN' ? (
                      <TouchableOpacity
                        onPress={() => {
                          onPress && onPress();
                        }}
                        style={{
                          width: 50,
                          height: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          resizeMode="contain"
                          style={{
                            width: scale(18),
                            height: scale(18),
                            tintColor: 'white',
                          }}
                          source={images.iconBack}
                        />
                      </TouchableOpacity>
                    ) : (
                      <Text
                        style={{
                          color: 'white',
                          flexShrink: 1, // cho phép chữ co lại
                          paddingHorizontal: 10,
                          fontSize: scale(14),
                          fontWeight: 'bold',
                        }}
                        numberOfLines={1} // chỉ hiển thị 1 dòng, cắt bớt
                        ellipsizeMode="tail">
                        {nameLesson}
                      </Text>
                    )}

                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        onPress={() => {
                          onVisible && onVisible();
                        }}
                        style={{
                          width: 50,
                          height: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{color: 'white', fontSize: 14}}>
                          {rate.label || `${rate.rate}X`}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {playerState === -1 ? (
                  <View style={{alignItems: 'center'}}>
                    <ActivityIndicator size="large" color="white" />
                  </View>
                ) : (
                  <View
                    style={{
                      alignSelf: 'stretch',
                      flex: 1,
                      justifyContent: 'space-evenly',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      disabled={elapsed <= 10}
                      style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                      onPress={tenBackward}>
                      <Image
                        source={images.tenBack}
                        style={[
                          styles.iconStyle,
                          {
                            tintColor:
                              elapsed <= 10
                                ? 'rgba(255, 255, 255 , 0.5)'
                                : 'white',
                          },
                        ]}
                      />
                    </TouchableOpacity>

                    {playerState === PLAYER_STATES.LOADING ? (
                      <View>
                        <ActivityIndicator size="large" color="white" />
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={{
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                        onPress={pressAction}>
                        <Image
                          source={iconControl()}
                          style={styles.iconStyle}
                        />
                      </TouchableOpacity>
                    )}

                    <TouchableOpacity
                      disabled={duration - elapsed < 10}
                      style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                      onPress={tenForward}>
                      <Image
                        source={images.tenFor}
                        style={[
                          styles.iconStyle,
                          {
                            tintColor:
                              duration - elapsed < 10
                                ? 'rgba(255, 255, 255 , 0.5)'
                                : 'white',
                          },
                        ]}
                      />
                    </TouchableOpacity>
                  </View>
                )}
                <SafeAreaView
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 10,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 12,
                        marginHorizontal: 20,
                      }}>
                      {formatTime(elapsed)}
                    </Text>

                    <Slider
                      style={{
                        flex: 1,
                        height: 40,
                      }}
                      minimumValue={0}
                      maximumValue={Math.floor(duration)}
                      minimumTrackTintColor={'red'}
                      maximumTrackTintColor="#ccc"
                      onSlidingComplete={value => onSeek(value)}
                      value={Math.floor(elapsed)}
                      thumbImage={thumbIcon}
                      thumbTintColor={Platform.OS === 'android' && 'red'}
                    />

                    <Text
                      style={{
                        color: 'white',
                        fontSize: 12,
                        marginHorizontal: 20,
                      }}>
                      {formatTime(duration)}
                    </Text>
                    <TouchableOpacity
                      onPress={handleFullScreen}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: scale(30),
                        width: scale(30),
                      }}>
                      <Icon
                        color={'white'}
                        size={scale(18)}
                        name={checkFull ? 'expand' : 'compress'}
                      />
                    </TouchableOpacity>
                  </View>
                </SafeAreaView>
              </View>
            )}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
const styles = {
  iconStyle: {
    width: scale(30),
    height: scale(30),
    resizeMode: 'contain',
    tintColor: 'white',
  },
};
export default YoutubeDetail;
