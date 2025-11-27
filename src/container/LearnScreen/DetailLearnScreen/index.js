import { useCallback } from 'react';
import {
  Text,
  View,
  Alert,
  TouchableOpacity,
  ImageBackground,
  Linking,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context';
import ImmersiveMode from 'react-native-immersive-mode';
import React, { useState, useEffect, useRef } from 'react';
import { scale } from 'react-native-size-scaling';
import { Button, Icon } from '@rneui/themed';
import moment from 'moment';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from 'react-native-paper';
import Orientation, {
  useDeviceOrientationChange,
} from 'react-native-orientation-locker';

import images from 'imagesApp';
import Lesson from './Lesson';
import { lessonsID, listLesson, userMapCourse } from 'store/actions/app';
import VideoDetail from './VideoDetail';
import YoutubeDetail from './YoutubeDetail';
import VimeoDetail from './VimeoDetail';
import ModalRate from 'components/ModalRate';
import { isRequestPending } from 'selectors/common';
import { useNextLesson } from 'src/features/video';
import * as courseService from '../../../services/course';
import colors from 'variables/colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const dataRate = [
  {
    name: '0.5x',
    rate: 0.5,
  },
  {
    name: '0.75x',
    rate: 0.75,
  },
  {
    name: 'Bình thường',
    rate: 1.0,
  },
  {
    name: '1.25x',
    rate: 1.25,
  },

  {
    name: '1.75x',
    rate: 1.75,
  },
  {
    name: '2.0x',
    rate: 2.0,
  },
];

const DetailLearnScreen = ({ navigation, route }) => {
  const loading = useSelector(state => isRequestPending(state, 'listLesson'));
  const datalUser = useSelector(state => state.auth.infoUseMe);

  const auth = useSelector(state => state.auth.listSite);
  const infoSite = useSelector(state => state.auth.infoSite);
  const learningCourses = useSelector(state => state.app.sourceLearning);
  const dispatch = useDispatch();
  const isNextLesson = useNextLesson();

  // ==== State ====
  const [visibleSV, setVisibleSV] = React.useState(false);
  const [selectedServer, setSelectedServer] = useState({
    type: 'server-1',
    name: 'Server 1',
  });
  const [type, setType] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [dataChoose, setDataChoose] = useState({});
  const [visible, setVisible] = useState(false);
  const [rate, setRate] = useState({
    label: '1.0x',
    value: 1.0,
  });
  const [sourceVideos, setSourceVideos] = useState('');
  const [originalSourceVideos, setOriginalSourceVideos] = useState(null);
  const [data, setData] = useState([]);
  const [lessonInfo, setLessonInfo] = useState({});
  const [arrLessons, setArrLessons] = useState([]);
  const [nameQuality, setNameQuality] = useState('Auto');
  const [itemClick, setItemClick] = useState({});
  const [indexLesson, setindexLesson] = useState(0);
  const [textLearn, setTextLearn] = useState('');
  const [deviceOrientation, setDeviceOrientation] = useState('');
  const [naturalSize, setNaturalSize] = useState(null);
  const { item } = route.params;
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerAnim = useRef(new Animated.Value(0)).current; // 0 normal, 1 fullscreen
  const [videoOrientation, setVideoOrientation] = useState(null);
  const [firstEnter, setFirstEnter] = useState(true);
  // useEffect(() => {
  //   loadLessons(true); // 👈 Có gọi lại
  // }, [navigation]);

  useEffect(() => {
    // lấy orientation hiện tại ngay khi vào màn
    Orientation.getDeviceOrientation(orientation => {
      const isLandscape = orientation?.startsWith('LANDSCAPE');
      if (isLandscape) {
        setIsFullscreen(true);
      } else {
        setIsFullscreen(false);
      }
    });
  }, []);

  useDeviceOrientationChange(o => {
    const isLandscape = o?.startsWith('LANDSCAPE');
    if (isLandscape || o === 'PORTRAIT-UPSIDEDOWN') {
      setIsFullscreen(true);
    } else {
      setIsFullscreen(false);
    }
  });

  useFocusEffect(
    useCallback(() => {
      // optional cleanup khi rời màn (không bắt buộc)
      // loadLessons(); // 👈 Có gọi lại
      loadLessons(true); // 👈 Có gọi lại

      return () => {};
    }, [navigation, firstEnter]),
  );

  const loadLessons = (shouldCallOnPressLearn = false) => {
    dispatch(
      listLesson(item?._id, auth?.access_token, (err, data) => {
        if (!err) {
          const arrLessons = data?.reduce(
            (total, currentValue) => total.concat(currentValue.child),
            [],
          );
          const filteredArrLessons = arrLessons.filter(
            item => item !== undefined,
          );
          setData(data);
          setArrLessons(filteredArrLessons);

          if (firstEnter) {
            const result = filteredArrLessons.find(item => !item.complete);
            setDataChoose(result || filteredArrLessons[0]);
            onPressLearn(
              result || filteredArrLessons[0],
              'lesson',
              filteredArrLessons,
            );
            setFirstEnter(false);
          }
        } else {
          Alert.alert('Thông báo', 'Lấy danh sách bài học không thành công', [
            {
              text: 'Đồng ý',
              onPress: () => {
                navigation.goBack();
              },
            },
          ]);
        }
      }),
    );
  };

  const onFullScreen = naturalSize => {
    const isPortraitVideo = naturalSize?.orientation === 'portrait';
    setVideoOrientation(isPortraitVideo ? 'portrait' : 'landscape');
    setIsFullscreen(prev => {
      const next = !prev;
      return next;
    });
  };
  useEffect(() => {
    if (isFullscreen) {
      if (videoOrientation === 'portrait') {
        Orientation.lockToPortrait();
      } else {
        Orientation.lockToLandscapeRight();
      }
      Animated.timing(containerAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }).start();
    } else {
      Orientation.lockToPortrait();
      Animated.timing(containerAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
      ImmersiveMode.setBarMode('Normal');
      // ImmersiveMode.setBarTranslucent(false);
    }

    return () => {
      Orientation.lockToPortrait();
    };
  }, [isFullscreen, containerAnim, videoOrientation]);
  const onVisibleQualyti = async () => {
    if (typeof sourceVideos === 'string' && /.m3u8$/.test(sourceVideos)) {
      if ([].length <= 0) {
        const a = await axios.get(sourceVideos);
        const qualityLevels = [];
        const lines = a.data.split('\n');
        lines.forEach(line => {
          if (line.startsWith('#EXT-X-STREAM-INF')) {
            const match = line.match(/RESOLUTION=(\d+x\d+)/);
            if (match) {
              qualityLevels.push(match[1]);
            }
          }
        });
      }
    }
  };
  const handleEnd = () => {
    if (isNextLesson) handleNext();
  };

  const videoDetail = () => {
    return (
      <VideoDetail
        nameLesson={itemClick?.name}
        rate={rate}
        itemClick={itemClick}
        nameQuality={nameQuality}
        onFullScreen={naturalSize => onFullScreen(naturalSize)}
        deviceOrientation={deviceOrientation}
        quality={sourceVideos}
        itemLearn={lessonInfo}
        onPressComplete={() => onPressComplete()}
        handleEnd={() => handleEnd()}
        onPress={() => navigation.goBack()}
        onVisible={() => setVisible(true)}
        isLandscape={isFullscreen}
        onNaturalSize={size => setNaturalSize(size)}
      />
    );
  };

  const switchSource = (type, name) => {
    if (type === 'aws') {
      setSourceVideos(dataChoose?.lesson_info?.aws_link);
    } else {
      let newSource = originalSourceVideos;

      if (typeof newSource === 'string' && newSource.endsWith('.m3u8')) {
        if (type === 'server-1') {
          newSource = newSource.replace('stream4', 'stream3');
        } else if (type === 'server-2') {
          newSource = newSource.replace('stream3', 'stream4');
        }
        setSourceVideos(newSource);
      } else {
        let temp = { ...newSource };
        if (type === 'server-1') {
          temp.src = temp.src.replace('stream2', 'stream');
        } else if (type === 'server-2') {
          temp.src = temp.src.replace('stream', 'stream2');
        }
        setSourceVideos(temp);
      }
    }

    setSelectedServer({
      type: type,
      name: name,
    }); // Cập nhật server đang chọn
    closeMenu();
  };
  const colorBtnSever = nameServer => {
    return selectedServer.type === nameServer ? 'green' : 'white';
  };

  const onFullScreenYoutube = () => {
    setIsFullscreen(p => !p);
  };

  const onPressComplete = () => {
    dispatch(
      lessonsID(
        'patch',
        auth.access_token,
        lessonInfo._id,
        {
          complete_status: 1,
        },
        (err, dt) => {
          if (err) {
            return;
          } else {
            const targetId = lessonInfo._id;
            const updatedModules =
              data &&
              data.map(module => ({
                ...module,
                child: module?.child?.map(child => {
                  if (child._id === targetId) {
                    return { ...child, complete: true };
                  }
                  return child;
                }),
              }));

            setData(updatedModules);
          }
        },
      ),
    );
  };

  const handleEndYoutube = async () => {
    onPressComplete();
    if (isNextLesson) handleNext();
  };
  const youtubeDetail = () => {
    return (
      <YoutubeDetail
        deviceOrientation={deviceOrientation}
        nameLesson={itemClick?.name}
        msg=""
        fullScreenYouTuBe={() => onFullScreenYoutube()}
        checkFull={isFullScreen}
        item={lessonInfo}
        onPress={() => navigation.goBack()}
        handleEndYoutube={() => handleEndYoutube()}
        rate={rate}
        onVisible={() => {
          setVisible(true);
        }}
      />
    );
  };

  const videoContainerStyle = {
    width: containerAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [
        SCREEN_WIDTH,
        videoOrientation === 'portrait' ? SCREEN_WIDTH : SCREEN_HEIGHT,
      ],
    }),
    height: containerAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [
        (SCREEN_WIDTH * 9) / 16,
        videoOrientation === 'portrait' ? SCREEN_HEIGHT : SCREEN_WIDTH,
      ],
    }),
    position: isFullscreen ? 'absolute' : 'relative',
    left: isFullscreen ? 0 : 'auto',
    top: isFullscreen ? 0 : 'auto',
    zIndex: 999,
    backgroundColor: 'black',
  };
  const videoVdocipher = () => {
    return <View />;
  };
  const vimeoDetail = () => {
    return (
      <VimeoDetail
        msg=""
        item={lessonInfo?.lesson_info}
        onPressComplete={() => onPressComplete()}
        // onPress={() => this.props.navigation.goBack()}
      />
    );
  };
  const viewText = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderBottomWidth: 0.5,
          borderBottomColor: 'grey',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ padding: scale(15), alignItems: 'flex-start' }}>
          <Icon
            onPress={() => navigation.goBack()}
            color={'black'}
            name={'keyboard-backspace'}
            size={scale(25)}
            type="material-community"
          />
        </View>
        <View style={{}}>
          <Text
            style={{ textAlign: 'center', fontSize: scale(14), color: 'black' }}
          >
            {textLearn}
          </Text>
        </View>
        <View style={{ padding: scale(15) }} />
      </View>
    );
  };
  const viewAction = () => {
    return (
      <ImageBackground
        resizeMode={isFullscreen ? 'contain' : 'cover'}
        source={images.imgDoc}
        imageStyle={{ opacity: 0.3 }}
        style={{
          flex: 1,
          justifyContent: 'space-between',
          backgroundColor: 'black',
        }}
      >
        <View style={{ padding: scale(15), alignItems: 'flex-start' }}>
          <Icon
            onPress={() => navigation.goBack()}
            color={'white'}
            name={'keyboard-backspace'}
            size={scale(25)}
            type="material-community"
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            handlerApilessonsID(itemClick, 'action');
          }}
          style={{
            borderRadius: scale(9999),
            padding: scale(10),
            borderWidth: 0.5,
            borderColor: 'white',
            alignSelf: 'center',
            marginHorizontal: scale(20),
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              textAlign: 'center',
              fontSize: scale(14),
              color: 'white',
            }}
          >
            Mở {itemClick?.name || 'tài liệu'}
          </Text>
        </TouchableOpacity>
        <View style={{ padding: scale(25), alignItems: 'flex-end' }}>
          {isFullscreen && (
            <Icon
              onPress={() => {
                setIsFullscreen(false);
              }}
              type="font-awesome"
              color={'white'}
              size={scale(18)}
              name={'expand'}
            />
          )}
        </View>
      </ImageBackground>
    );
  };

  const handlerApilessonsID = async (item, type) => {
    if (type === 'test') {
      setType('action');
      const data = {
        quiz_test_id: [item?.complete_quiz_lesson],
        _id: item?._id,
        name: 'Bài kiểm tra',
      };

      navigation.navigate('TestScreen', { data, datalUser });
    } else {
      const data = await courseService.getLesson(item?._id, auth.access_token);
      setDataChoose(data);

      if (data?.lesson_info) {
        // Bài học video mơi
        if (data?.lesson_info?.type === 'youtube') {
          setType(data?.lesson_info.type);
          setLessonInfo(data);
        } else if (data?.lesson_info?.type === 'vimeo') {
          setType(data?.lesson_info?.type);
          setLessonInfo(data);
        } else if (data?.lesson_info?.type === 'video_aws') {
          const sourceVideo =
            data?.lesson_info?.source || data?.lesson_info?.url;

          setType(data?.lesson_info?.type);
          setLessonInfo(data);
          setSourceVideos(sourceVideo);
          // Lưu source gốc
          setOriginalSourceVideos(sourceVideo);
        } else {
          const lengthSourceVideo = data?.lesson_info?.source.length;
          const sourceVideo = data?.lesson_info?.source[lengthSourceVideo - 1];
          setType(data?.lesson_info?.type);
          setLessonInfo(data);
          setSourceVideos(sourceVideo);
          // Lưu source gốc
          setOriginalSourceVideos(sourceVideo);
        }
      } else if (data?.video) {
        // Bài học video cũ
      } else if (data?.document_info) {
        // Bài giảng mới
        setType('action');
        navigation.navigate('DocumentInfo', {
          data: { ...data, document_info: data?.document_info },
        });
      } else if (data?.document) {
        setType('');

        navigation.navigate('DocumentInfo', {
          data: { ...data, document_info: data?.document },
        });
        // Bài giảng cũ
      } else if (data?.quiz_test_id && data?.quiz_test_id.length) {
        setType('action');
        navigation.navigate('TestScreen', {
          data,
          datalUser,
        });

        // bài học là BKT
      } else if (data?.flashcards && data?.flashcards.length) {
        setType('action');
        navigation.navigate('FlashcardScreen', { data });
      } else if (data?.text_content) {
        setType('action');
        navigation.navigate('TextContent', { data });
        // Bài học dạng html
      } else {
        // ko tồn tại
        setTextLearn('Bài học chưa có nội dung');
        setType('text');
      }
    }
  };

  const onPressLearn = (item, type, lessons) => {
    const { dataCourse, dataType, item: routeItem } = route.params;
    //Cài đặt bài học
    const typeOpenLesson = dataCourse.type_open_lesson;
    //Index bài học hiện tại: currentLessonIndex
    const indexLesson = lessons.findIndex(
      e => String(e._id) === String(item?._id),
    );
    //Bài đầu tiên luôn được mở
    const isFirstLesson = indexLesson === 0;
    setSelectedServer({ type: 'server-1', name: 'Server 1' });
    //Bài học có complete true gần nhất : lastDoneIdx
    setindexLesson(indexLesson);
    setItemClick(item);
    // check bài học trước đã hoàn thành
    const isPreviousLessonComplete = lessons[indexLesson - 1];
    if (isFirstLesson) {
      handlerApilessonsID(item, type);
      return;
    }

    // Các điều kiện sau bài đầu tiên

    switch (typeOpenLesson) {
      case 3:
        {
          if (isPreviousLessonComplete?.complete) {
            const currentTime = moment();
            const openAt = moment(isPreviousLessonComplete?.complete_at)
              .add(dataType.open_time_next_lesson, 'days')
              .startOf('day')
              .add(1, 'hours');
            if (item?.complete) {
              handlerApilessonsID(item, type);
            } else {
              if (currentTime.isAfter(openAt)) {
                handlerApilessonsID(item, type);
              } else {
                const formatOpenAt = openAt.format('DD/MM/YYYY HH:mm');
                setTextLearn(`Bài học sẽ mở vào lúc ${formatOpenAt}`);
                setType('text');
              }
            }
          } else {
            // bạn phải hoàn thành bài trước
            setTextLearn('Bạn cần hoàn thành bài học trước !');
            setType('text');
            return;
          }
        }
        break;
      case 2:
        {
          if (item?.complete) {
            handlerApilessonsID(item, type);
            return;
          }
          if (dataType?.open_time_lesson) {
            const openAt = moment(dataType?.start_time).add(
              dataType.open_time_lesson * indexLesson ||
                dataType.open_time_lesson,
              'days',
            );
            const formattedTime = moment(openAt).format('hh:mm:ss DD/MM/YYYY');
            setTextLearn(`Bài học sẽ mở vào lúc ${formattedTime}`);
            setType('text');
          } else {
            handlerApilessonsID(item, type);
          }
        }
        break;
      default:
        {
          handlerApilessonsID(item, type);
        }
        break;
    }
  };

  const switchStyle = () => {
    switch (type) {
      case 'youtube':
        return youtubeDetail();
      case 'video_vdocipher':
        return videoVdocipher();
      case 'video':
        return videoDetail();
      case 'video/stream':
        return videoDetail();
      case 'vimeo':
        return vimeoDetail();
      case 'video_aws':
        return videoDetail();
      case 'text':
        return viewText();
      case 'action':
        return viewAction();
      default: {
        return (
          <View style={{ flex: 1 }}>
            <ImageBackground
              source={{
                uri: item?.thumbnail_url,
              }}
              style={{
                width: '100%',
                height: '100%',
                flexDirection: 'row',
              }}
              resizeMode="contain"
              defaultSource={images.noThumb}
            >
              <Icon
                style={{ margin: scale(10) }}
                onPress={() => navigation.goBack()}
                color={'white'}
                name={'keyboard-backspace'}
                size={scale(25)}
                type="material-community"
              />
            </ImageBackground>
          </View>
        );
      }
    }
  };
  const openMenu = () => setVisibleSV(true);
  const closeMenu = () => setVisibleSV(false);
  const handleArrow = () => {
    const indexNext = indexLesson - 1;
    const itemNext = arrLessons[indexNext];
    if (itemNext) {
      setDataChoose(itemNext);
      onPressLearn(itemNext, 'lesson', arrLessons);
    } else {
    }
  };
  const handleNext = () => {
    const indexNext = indexLesson + 1;
    const itemNext = arrLessons[indexNext];

    if (itemNext) {
      setDataChoose(itemNext);
      onPressLearn(itemNext, 'lesson', arrLessons);
    } else {
      console.log('Đã tới bài cuối cùng');
    }
  };

  return (
    <SafeAreaView
      edges={isFullscreen ? [] : ['top', 'left', 'right', 'bottom']}
      style={{
        flex: 1,
        backgroundColor: isFullscreen ? 'black' : 'white',
      }}
    >
      {visibleSV && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: 1,
          }}
          onTouchStart={closeMenu}
        />
      )}

      <Animated.View style={[styles.videoWrapper, videoContainerStyle]}>
        {switchStyle()}
      </Animated.View>
      <View style={{ flex: 1, display: isFullscreen ? 'none' : 'flex' }}>
        {!loading && (
          <View>
            <Text
              style={{
                color: 'black',
                padding: scale(5),
                fontWeight: 'bold',
              }}
            >
              {itemClick?.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: scale(5),
                justifyContent: 'space-between',
              }}
            >
              {type === 'video' && !isFullScreen && (
                <Menu
                  contentStyle={{
                    overflow: 'hidden',
                    paddingVertical: 0, // Bỏ padding trên/dưới
                  }}
                  visible={visibleSV}
                  onDismiss={closeMenu}
                  anchor={
                    <Button
                      buttonStyle={{ backgroundColor: 'green' }}
                      titleStyle={{ color: 'white', fontSize: scale(14) }}
                      onPress={openMenu}
                    >
                      {selectedServer.name}
                      <Icon
                        color={'white'}
                        name={visibleSV ? 'menu-up' : 'menu-down'}
                        size={scale(20)}
                        type="material-community"
                      />
                    </Button>
                  }
                >
                  <Menu.Item
                    style={{
                      backgroundColor: colorBtnSever('server-1'),
                    }}
                    onPress={() => switchSource('server-1', 'Server 1')}
                    title="Server 1"
                    titleStyle={{
                      color:
                        selectedServer.type === 'server-1' ? 'white' : 'black',
                      fontSize: 14,
                    }}
                  />
                  <Menu.Item
                    style={{
                      backgroundColor: colorBtnSever('server-2'),
                    }}
                    onPress={() => switchSource('server-2', 'Server 2')}
                    title="Server 2"
                    titleStyle={{
                      color:
                        selectedServer.type === 'server-2' ? 'white' : 'black',
                      fontSize: 14,
                    }}
                  />
                  {dataChoose?.lesson_info &&
                    'aws_link' in (dataChoose?.lesson_info || {}) && (
                      <Menu.Item
                        style={{
                          backgroundColor: colorBtnSever('aws'),
                        }}
                        onPress={() => switchSource('aws', 'Server Quốc Tế')}
                        title="Server Quốc Tế"
                        titleStyle={{
                          color:
                            selectedServer.type === 'aws' ? 'white' : 'black',
                          fontSize: 14,
                        }}
                      />
                    )}
                </Menu>
              )}

              <View style={{ flexDirection: 'row' }}>
                {indexLesson !== 0 && (
                  <Button
                    onPress={() => handleArrow()}
                    buttonStyle={{
                      backgroundColor: 'grey',
                      marginRight: scale(10),
                    }}
                    titleStyle={{ fontSize: scale(14) }}
                  >
                    <Icon
                      color={'white'}
                      name={'arrow-left'}
                      size={scale(14)}
                      style={{ marginRight: scale(5) }}
                      type="material-community"
                    />
                    Bài trước
                  </Button>
                )}
                {indexLesson !== arrLessons.length - 1 && (
                  <Button
                    buttonStyle={{ backgroundColor: colors.blue3 }}
                    onPress={() => handleNext()}
                    titleStyle={{ color: 'white', fontSize: scale(14) }}
                  >
                    Bài tiếp
                    <Icon
                      style={{ marginLeft: scale(5) }}
                      color={'white'}
                      name={'arrow-right'}
                      size={scale(14)}
                      type="material-community"
                    />
                  </Button>
                )}
              </View>
            </View>
          </View>
        )}
        <Lesson
          check={dataChoose}
          onPress={(itemLearn, type) => {
            onPressLearn(itemLearn, type, arrLessons);
          }}
          selectedLesson={itemClick}
          data={data}
          loadingCourse={loading}
          navigation={navigation}
          datalUser={datalUser}
        />
      </View>

      <ModalRate
        // checkFull={checkFull}
        visible={visible}
        backdropOpacity={0.7}
      >
        <View style={[{ backgroundColor: 'white' }]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ fontSize: scale(14), color: 'black' }}>
              Tốc độ video
            </Text>

            <Icon
              onPress={() => {
                setVisible(false);
              }}
              color={'black'}
              name={'close'}
              size={scale(20)}
              type="material-community"
            />
          </View>

          {dataRate.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setRate(item);
                  setVisible(!visible);
                }}
                style={{ flexDirection: 'row', padding: scale(10) }}
              >
                {rate?.rate === item.rate && (
                  <Icon
                    color={'black'}
                    name={'check'}
                    size={scale(20)}
                    type="material-community"
                  />
                )}
                <Text
                  style={{
                    color: 'black',
                    fontSize: scale(12),
                    marginLeft: scale(10),
                    fontWeight: rate === item.rate ? 'bold' : 'normal',
                  }}
                >
                  {item?.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ModalRate>
    </SafeAreaView>
  );
};
export default DetailLearnScreen;
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  videoWrapper: {
    backgroundColor: 'black',
    overflow: 'hidden',
  },
});
