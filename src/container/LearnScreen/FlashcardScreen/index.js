import React, { useState, useEffect, useRef } from 'react';
import {
  Pressable,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '@rneui/themed';
import { Slider } from '@react-native-assets/slider';
import { scale } from 'react-native-size-scaling';
import { useDispatch, useSelector } from 'react-redux';
import Video from 'react-native-video';
import ReactNativeBlobUtil from 'react-native-blob-util';

import { ContentHTML } from '../TextContent';
import colors from 'colors';
import images from 'src/assets/images';
import { setLessonComplete } from '../../../services/course';

const RegularContent = ({ content }) => {
  return (
    <View style={regularContentStyles.card}>
      <View style={{ alignItems: 'center' }}>
        <Text
          // onTextLayout={({nativeEvent: {lines}}) => {
          //   if (lines.length >= 2) {
          //     alert('Text has 2 lines');
          //   }
          // }}
          numberOfLines={2}
          style={regularContentStyles.text}
        >
          {content?.term}
        </Text>
        <Text style={{ fontSize: scale(9), marginTop: 5 }}>
          (Bấm để xem định nghĩa)
        </Text>
      </View>
      {content?.image && (
        <Image
          resizeMode="contain"
          source={{
            uri: content?.image,
          }}
          defaultSource={images.noThumb}
          style={{ width: '100%', height: '60%', padding: 5 }}
          onError={e => console.log('Image load error:', e.nativeEvent.error)}
        />
      )}
    </View>
  );
};

const regularContentStyles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    overflow: 'hidden',
  },
  text: {
    color: colors.blue3,
    fontSize: scale(14),
    textAlign: 'center',
    padding: 5,
  },
});

const FlippedContent = ({ content }) => {
  return (
    <View style={flippedContentStyles.card}>
      <Text numberOfLines={10} style={flippedContentStyles.text}>
        {content?.definition}
      </Text>
    </View>
  );
};

const flippedContentStyles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.blue3,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: scale(14),
    textAlign: 'center',
    padding: 5,
  },
});
const FlipCard = ({
  isFlipped,
  cardStyle,
  direction = 'y',
  duration = 500,
  RegularContent,
  FlippedContent,
}) => {
  const isDirectionX = direction === 'x';

  const regularCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [0, 180]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [
        isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
      ],
    };
  });

  const flippedCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [180, 360]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [
        isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
      ],
    };
  });

  return (
    <View>
      <Animated.View
        style={[
          flipCardStyles.regularCard,
          cardStyle,
          regularCardAnimatedStyle,
        ]}
      >
        {RegularContent}
      </Animated.View>
      <Animated.View
        style={[
          flipCardStyles.flippedCard,
          cardStyle,
          flippedCardAnimatedStyle,
        ]}
      >
        {FlippedContent}
      </Animated.View>
    </View>
  );
};

const flipCardStyles = StyleSheet.create({
  regularCard: {
    position: 'absolute',
    zIndex: 1,
  },
  flippedCard: {
    zIndex: 2,
  },
});

function FlashcardScreen(props) {
  const { data } = props.route.params;
  const [flashcards, setFlashcards] = useState(data.flashcards);
  const [audioPath, setAudioPath] = useState(null);
  const [isCompleted, setIsCompleted] = useState(data.complete);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [timeLeft, setTimeLeft] = useState(15);
  const timerRef = React.useRef(null);
  const dispatch = useDispatch();

  const playerRef = useRef(null);

  const isFlipped = useSharedValue(false);
  const translateX = useSharedValue(0);

  const handlePress = () => {
    isFlipped.value = !isFlipped.value;
  };
  const handlePrev = () => {
    if (currentIndex > 0) {
      translateX.value = withTiming(300, { duration: 250 }, () => {
        isFlipped.value = withTiming(false, { duration: 0 });

        const prevIndex = currentIndex - 1;
        runOnJS(setCurrentIndex)(prevIndex);

        translateX.value = -300;
        translateX.value = withTiming(0, { duration: 150 });
      });
    }
  };
  const slideStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      opacity: translateX.value === 0 ? 1 : 0.4,
    };
  });
  const handleNext = () => {
    if (currentIndex < data.flashcards.length - 1) {
      translateX.value = withTiming(-600, { duration: 1000 }, () => {
        isFlipped.value = withTiming(false, { duration: 0 });
        const nextIndex = currentIndex + 1;
        runOnJS(setCurrentIndex)(nextIndex);
        translateX.value = 300;
        translateX.value = withTiming(0, { duration: 250 });
      });
    }
  };

  const startTimer = () => {
    if (timerRef.current) return; // Tránh tạo nhiều interval
    setIsPaused(false);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;

          runOnJS(() => {
            handleNext();
            // Nếu vẫn đang Play → timer chạy tiếp
            if (!isPaused) startTimer();
          })();

          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPaused(true);
  };

  useEffect(() => {
    if (currentIndex === data.flashcards.length - 1) {
      stopTimer();
      setTimeLeft(0);
      return;
    }
    setTimeLeft(15); // reset mỗi khi chuyển
    if (!isPaused) {
      stopTimer(); // xoá interval cũ
      startTimer(); // tạo timer mới
    }
  }, [currentIndex]);
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const handleDone = async () => {
    try {
      const _id = data._id;
      dispatch(setLessonComplete(_id));
      setIsCompleted(true);
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const handleSuffle = () => {
    // Dùng thuật toán Fisher–Yates
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentIndex(0);
    isFlipped.value = false;
    translateX.value = withTiming(0, { duration: 0 });
    setTimeLeft(15);
    if (!isPaused) {
      stopTimer();
      startTimer();
    }
  };
  const handleVolume = async () => {
    const domain = 'thanhngaofficial';

    const currentCard = flashcards[currentIndex];
    let text = '';
    let lang = '';
    if (isFlipped.value) {
      text = currentCard.definition;
      lang = currentCard.lang_definition;
    } else {
      text = currentCard.term;
      lang = currentCard.lang_term;
    }
    try {
      const response = await fetch(`https://${domain}.edubit.vn/api/tts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          lang,
        }),
      });
      const data = await response.json();

      if (data?.audioUrl) {
        // Tách phần base64 (bỏ phần "data:audio/mpeg;base64,")
        const base64Data = data.audioUrl.replace(
          /^data:audio\/\w+;base64,/,
          '',
        );
        // Tạo đường dẫn tạm cho file mp3
        const path = `${
          ReactNativeBlobUtil.fs.dirs.CacheDir
        }/tts_${Date.now()}.mp3`;
        // Ghi file base64 thành mp3
        await ReactNativeBlobUtil.fs.writeFile(path, base64Data, 'base64');
        setAudioPath('file://' + path); // Cập nhật path cho player
      }
    } catch (error) {
      Alert.alert('Thông báo', 'Không thể lấy được âm thanh');
    }
  };
  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Animated.View style={slideStyle}>
            <Pressable onPress={handlePress}>
              <FlipCard
                isFlipped={isFlipped}
                cardStyle={styles.flipCard}
                FlippedContent={
                  <FlippedContent content={flashcards[currentIndex]} />
                }
                RegularContent={
                  <RegularContent content={flashcards[currentIndex]} />
                }
              />
            </Pressable>
          </Animated.View>
          <View style={{}}>
            <View style={{ padding: 16 }}>
              <View style={styles.buttonContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity
                    onPress={handlePrev}
                    disabled={currentIndex === 0}
                    style={{
                      width: scale(70),
                      borderRadius: 99,
                      backgroundColor:
                        currentIndex === 0 ? 'grey' : colors.blue3,
                      paddingVertical: 5,
                    }}
                  >
                    <Icon
                      name="arrow-left"
                      type="material-community"
                      color={'white'}
                      size={20}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      paddingHorizontal: 10,
                      fontSize: scale(12),
                      color: 'black',
                    }}
                  >
                    {currentIndex + 1}/{data?.flashcards.length}
                  </Text>
                  <TouchableOpacity
                    onPress={handleNext}
                    disabled={currentIndex === data?.flashcards.length - 1}
                    style={{
                      width: scale(70),
                      borderRadius: 99,
                      backgroundColor:
                        currentIndex === data.flashcards.length - 1
                          ? 'grey'
                          : colors.blue3,
                      paddingVertical: 5,
                    }}
                  >
                    <Icon
                      name="arrow-right"
                      type="material-community"
                      color={'white'}
                      size={20}
                    />
                  </TouchableOpacity>
                  {!isPaused && (
                    <Text
                      style={{
                        color: 'black',
                        marginLeft: scale(10),
                        fontSize: scale(12),
                      }}
                    >
                      Chuyển sau {timeLeft}s
                    </Text>
                  )}
                  {currentIndex === data.flashcards.length - 1 &&
                    !isCompleted && (
                      <TouchableOpacity
                        onPress={handleDone}
                        style={{
                          backgroundColor: colors.blue3,
                          marginLeft: 10,
                          padding: 5,
                          borderRadius: 4,
                        }}
                      >
                        <Text style={{ color: 'white' }}>Hoàn thành</Text>
                      </TouchableOpacity>
                    )}
                </View>
                <Icon
                  onPress={handleVolume}
                  name={'volume-high'}
                  type="material-community"
                  color={'black'}
                  size={20}
                />
                <Icon
                  onPress={handleSuffle}
                  name={'shuffle'}
                  type="material-community"
                  color={'black'}
                  size={20}
                />
                {currentIndex === data.flashcards.length - 1 ? (
                  <View></View>
                ) : (
                  <Icon
                    onPress={() => {
                      if (isPaused) startTimer();
                      else stopTimer();
                    }}
                    name={isPaused ? 'play-circle' : 'pause-circle'}
                    type="material-community"
                    color={isPaused ? 'black' : colors.blue3}
                    size={20}
                  />
                )}
              </View>

              <View style={[styles.contentView]}>
                <View style={{ width: '100%', padding: 0 }}>
                  <Slider
                    value={currentIndex + 1} // set the current slider's value
                    minimumValue={0} // Minimum value (defaults as 0)
                    maximumValue={data?.flashcards.length} // Maximum value (defaults as minimumValue + step)
                    step={1} // The step for the slider (0 means that the slider will handle any decimal value within the range [min, max])
                    minimumTrackTintColor={colors.blue3} // The track color before the current value
                    maximumTrackTintColor="grey" // The track color after the current value
                    thumbTintColor="transparent" // The color of the slider's thumb
                    thumbStyle={'undefined'} // Override the thumb's style
                    trackStyle={{
                      borderRadius: 0,
                    }} // Override the tracks' style
                    minTrackStyle={undefined} // Override the tracks' style for the minimum range
                    maxTrackStyle={undefined} // Override the tracks' style for the maximum range
                    enabled={false} // If false, the slider won't respond to touches anymore
                    trackHeight={4} // The track's height in pixel
                    thumbSize={10} // The thumb's size in pixel
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        {data?.text_content && <ContentHTML data={data} />}
        {audioPath && (
          <Video
            ref={playerRef}
            source={{ uri: audioPath }}
            audioOnly
            paused={false}
            playInBackground
            ignoreSilentSwitch="ignore"
            onEnd={() => setAudioPath(null)} // reset khi phát xong
            onError={e => console.log('Error playing TTS:', e)}
          />
        )}
      </SafeAreaView>
    </ScrollView>
  );
}
export default FlashcardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleButton: {
    backgroundColor: '#b58df1',
    padding: 12,
    borderRadius: 48,
  },
  toggleButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  flipCard: {
    width: Dimensions.get('window').width - 40,
    height: scale(200),
    backfaceVisibility: 'hidden',
  },
  contentView: {},
});
