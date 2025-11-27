import React, { Component, useState, useRef, useEffect } from 'react';
import {
  Image,
  TouchableOpacity,
  Text,
  View,
  TouchableWithoutFeedback,
  Animated,
  Alert,
  Dimensions,
  Platform,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Video from 'react-native-video';
import { Slider } from '@react-native-assets/slider';
import { scale } from 'react-native-size-scaling';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import { humanizeVideoDuration } from 'components/MediaControl/utiles';
import { PLAYER_STATES } from './playStates';
import images from 'imagesApp';
import { getPlayerStateIcon } from './utiles';
import { Watermark } from 'src/components/Watermark';

var { height, width } = Dimensions.get('window');

const VideoDetail = ({
  onFullScreen,
  onVisible,
  onPress,
  onPressComplete,
  quality,
  rate,
  dataSite,
  itemLearn,
  itemClick,
  onNaturalSize,
  isLandscape,
  deviceOrientation,
  nameLesson,
  handleEnd,
}) => {
  const videoRef = useRef(null);
  const [isBuffering, setIsBuffering] = useState(false);
  const infoUser = useSelector(state => state.auth.infoUseMe);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [opacity, setOpacity] = useState(new Animated.Value(0));

  const [isVisible, setisVisible] = useState(false);
  const [naturalSize, setNaturalSize] = useState({});
  const [thumbIcon, setThumbIcon] = useState(null);
  const [status, setStatus] = useState(itemLearn.complete || false);
  const [hasAlerted, setHasAlerted] = useState(false);

  useEffect(() => {
    fadeInControls(); // 👈 Hiện control ngay khi component vừa render
  }, []);
  useEffect(() => {
    Icon.getImageSource('circle', scale(18), 'red').then(source => {
      setThumbIcon(source);
    });
  }, []);
  useEffect(() => {
    // Khi chuyển bài học mới, tự phát lại
    setPaused(false);
    setPlayerState(PLAYER_STATES.PLAYING);
    setCurrentTime(0); // tuỳ chọn: đưa video về đầu
    setDuration(0);
    fadeInControls(false);
    setHasAlerted(false);
  }, [itemClick?._id]);

  const onPaused = playerState => {
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    videoRef.current.seek(0);
    setPlayerState(PLAYER_STATES.PLAYING);
  };
  const onSeek = seek => {
    videoRef.current.seek(seek || 0);
    if (playerState === PLAYER_STATES.ENDED) {
      setPlayerState(PLAYER_STATES.PLAYING);
    }
  };
  const tenForward = () => {
    if (videoRef.current) {
      videoRef.current.seek(currentTime + 10);
    }
  };
  const tenBackward = () => {
    if (videoRef.current) {
      videoRef.current.seek(currentTime - 10);
    }
    if (playerState === PLAYER_STATES.ENDED) {
      setPlayerState(PLAYER_STATES.PLAYING);
    }
  };
  const onEnd = () => {
    setPlayerState(PLAYER_STATES.ENDED);
    handleEnd && handleEnd();

    if (!status && !hasAlerted) {
      onPressComplete && onPressComplete();
      setStatus(true); // Đặt trạng thái là đã hoàn thành
      fadeInControls();
    }
  };
  const onLoad = data => {
    setDuration(data.duration);
    onNaturalSize?.(data.naturalSize);
    setNaturalSize(data.naturalSize);
  };
  const onLoadStart = () => {};
  const onProgress = data => {
    const { currentTime } = data;
    if (playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
    if (
      duration > 0 &&
      currentTime >=
        (duration * 0.5 || itemClick?.lesson_info?.duration * 0.5) &&
      !itemClick?.complete &&
      !hasAlerted
    ) {
      setHasAlerted(true);
      onPressComplete && onPressComplete();
      return;
    }
  };
  const onFullScreen1 = () => {
    onFullScreen && onFullScreen(naturalSize);
  };

  const onVisible1 = () => {
    onVisible && onVisible();
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
  const toggleControls = () => {
    opacity.stopAnimation(value => {
      setisVisible(!!value);
      return value ? fadeOutControls() : fadeInControls();
    });
  };

  const onPress1 = () => {
    onPress && onPress();
  };
  const cancelAnimation = () => {
    opacity.stopAnimation(() => {
      setisVisible(true);
    });
  };

  const onPause = () => {
    const { PLAYING, PAUSED } = PLAYER_STATES;
    switch (playerState) {
      case PLAYING: {
        cancelAnimation();
        break;
      }
      case PAUSED: {
        fadeOutControls(5000);
        break;
      }
      default:
        break;
    }
    const newPlayerState = playerState === PLAYING ? PAUSED : PLAYING;
    return onPaused(newPlayerState);
  };

  const pressAction = () => {
    playerState === PLAYER_STATES.ENDED ? onReplay() : onPause();
  };
  let text = dataSite?.setting_appear_security
    ? `${dataSite?.appear_email ? infoUser?.email : ''} ${
        dataSite?.appear_name ? infoUser?.fullname : ''
      } ${dataSite?.appear_phone ? infoUser?.phone : ''} ${
        dataSite?.appear_custom ? dataSite?.appear_custom : ''
      }`.trim()
    : '';

  const iconControl = () => {
    return getPlayerStateIcon(playerState);
  };

  return (
    <View
      style={
        isLandscape
          ? naturalSize?.orientation === 'portrait'
            ? {
                flex: 1,
                width: width,
                height: height,
              }
            : { flex: 1 }
          : { flex: 1 }
      }
    >
      <Video
        onError={err => {
          switch (err?.error?.localizedDescription) {
            case 'The requested URL was not found on this server.':
              Alert.alert('Thông báo', 'Video không tồn tại hoặc đã bị xóa');
              break;
            default:
              Alert.alert(
                'Thông báo',
                err?.error?.localizedDescription ||
                  'Có lỗi xảy ra khi tải video, vui lòng thử lại sau !',
              );
              break;
          }
        }}
        ignoreSilentSwitch={'ignore'}
        playInBackground={true}
        playWhenInactive={true}
        muted={false}
        rate={rate?.rate}
        onEnd={onEnd}
        onLoad={onLoad}
        onBuffer={meta => {
          setIsBuffering(meta.isBuffering);
        }}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        ref={videoRef}
        resizeMode={'contain'}
        source={{
          uri: quality?.src || quality,
          headers: {
            'X-Stream-Origin': 'app-thanhnga',
          },
        }}
        // style={{
        //   position: 'absolute',
        //   top: 0,
        //   left: 0,
        //   bottom: 0,
        //   right: 0,

        // }}
        style={StyleSheet.absoluteFill}
      />
      <Watermark
        height={190}
        width={190}
        text={text}
        timeAppear={((dataSite && dataSite.time_appear) || 2) * 1000} //Lần đầu hiển thị
        opacity={dataSite?.opacity / 100 || 1} //Lần đầu hiển thị
        fontSize={scale(dataSite?.font_size) || scale(14)}
        fullScreen={true}
      />

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

              { opacity },
            ]}
          >
            {isVisible ? (
              <SafeAreaView edges={['left', 'right']} style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flex: 1,
                      paddingHorizontal: 10,
                    }}
                  >
                    {!isLandscape ? (
                      <TouchableOpacity
                        onPress={onPress1}
                        style={{
                          width: 50,
                          height: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
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
                        ellipsizeMode="tail"
                      >
                        {nameLesson}
                      </Text>
                    )}
                    <View style={{}}>
                      <TouchableOpacity
                        onPress={onVisible1}
                        style={{
                          width: 50,
                          height: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Text style={{ color: 'white', fontSize: 14 }}>
                          {rate.label || `${rate.rate}X`}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'space-evenly',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <TouchableOpacity
                    disabled={currentTime <= 10}
                    style={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                    onPress={tenBackward}
                  >
                    <Image
                      source={images.tenBack}
                      style={{
                        height: scale(30),
                        resizeMode: 'contain',
                        width: scale(30),
                        tintColor:
                          currentTime <= 10
                            ? 'rgba(255, 255, 255 , 0.5)'
                            : 'white',
                      }}
                    />
                  </TouchableOpacity>
                  {isBuffering ? (
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
                      onPress={pressAction}
                    >
                      <Image
                        source={iconControl()}
                        style={{
                          height: scale(30),
                          resizeMode: 'contain',
                          width: scale(30),
                          tintColor: 'white',
                        }}
                      />
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    disabled={duration - currentTime <= 10}
                    style={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                    onPress={tenForward}
                  >
                    <Image
                      source={images.tenFor}
                      style={{
                        height: scale(30),
                        resizeMode: 'contain',
                        width: scale(30),
                        tintColor:
                          duration - currentTime <= 10
                            ? 'rgba(255, 255, 255 , 0.5)'
                            : 'white',
                      }}
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 12,
                        marginHorizontal: 20,
                      }}
                    >
                      {humanizeVideoDuration(currentTime)}
                    </Text>

                    <Slider
                      style={{
                        flex: 1,
                        height: 40,
                      }}
                      thumbTintColor={Platform.OS === 'android' && 'red'}
                      minimumValue={0}
                      maximumValue={Math.floor(duration)}
                      minimumTrackTintColor={'red'}
                      maximumTrackTintColor="#ccc"
                      onSlidingComplete={value => onSeek(value)}
                      value={Math.floor(currentTime)}
                      thumbImage={thumbIcon}
                    />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 12,
                        marginHorizontal: 20,
                      }}
                    >
                      {humanizeVideoDuration(duration)}
                    </Text>
                    <TouchableOpacity
                      onPress={onFullScreen1}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: scale(30),
                        width: scale(30),
                      }}
                    >
                      <Icon
                        color={'white'}
                        size={scale(18)}
                        // name={checkFull ? 'expand' : 'compress'}
                        name={'expand'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </SafeAreaView>
            ) : null}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
export default VideoDetail;
