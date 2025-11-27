import React, {Component, useRef, useEffect, useState} from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {scale} from 'react-native-size-scaling';
import {Icon} from '@rneui/themed';

import colors from 'colors';
import _ from 'lodash';
import RouterService from 'src/container/Router/RouterService';
import {quizTest} from 'actions/app';

const Lesson = ({
  onPress,
  check,
  loadingCourse,
  data,
  selectedLesson,
  navigation,
}) => {
  const flatListRef = useRef(null);
  const chapterRefs = useRef({});
  const lessonRefs = useRef({});
  const [selectedLessonId, setSelectedLessonId] = React.useState(null);
  const [expandedLessonId, setExpandedLessonId] = React.useState(null);

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth.listSite);
  const [listQuiz, setListQuiz] = useState([]);

  const handlePress = (item, type) => {
    setSelectedLessonId(item._id);
    onPress && onPress(item, type);
  };
  const result = data && data.filter(item => item.status_lesson !== 1);
  console.log('result1', result);

  React.useEffect(() => {
    if (check?._id) {
      setSelectedLessonId(check._id);
      setExpandedLessonId(check._id);
    }
  }, [check]);
  const checkSource = item => {
    if (item?.lesson_info || item?.video) return 'logo-youtube';
    if (item?.document_info) return 'document-outline';
    if (item?.quiz_test_id) return 'list-outline';
    return 'caret-forward-circle-outline';
  };
  const formatTime = seconds => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return hrs > 0
      ? `${hrs.toString().padStart(2, '0')}:${mins
          .toString()
          .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
      : `${mins.toString().padStart(2, '0')}:${secs
          .toString()
          .padStart(2, '0')}`;
  };
  const countTest = lesson => {
    const listQuizA =
      listQuiz &&
      listQuiz.find(item => item._id === lesson?.complete_quiz_lesson);

    return (listQuizA && listQuizA.quiz_test_count) || 0;
  };
  // Component hiển thị lesson con
  const ChildLessonList = React.memo(({children}) => {
    if (_.isEmpty(children)) return null;
    return (
      <FlatList
        data={children}
        keyExtractor={(child, idx) => `child-${idx}`}
        renderItem={({item}) => {
          const isSelected = selectedLessonId === item._id; // so sánh với item con
          return (
            <TouchableOpacity
              key={item._id}
              onPress={() => {
                setSelectedLessonId(item._id);
                if ('document_info' in item) {
                  navigation.navigate('DocumentInfo', {
                    data: {...item, document_info: item.document_info},
                  });
                  return;
                }
                Alert.alert('Thông báo', 'Chức năng này chưa được cập nhật');
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: scale(10),
                paddingLeft: scale(20),
                backgroundColor: isSelected ? '#0cacea21' : '#fff', // thêm màu nền
                // backgroundColor: 'red', // thêm màu nền
              }}>
              <Icon
                color={item?.complete ? colors.blue3 : 'black'}
                name={
                  item?.complete
                    ? 'checkmark-circle-outline'
                    : 'document-text-outline'
                }
                size={scale(14)}
                type="ionicon"
              />
              <Text
                style={{
                  color: item?.complete ? colors.blue3 : 'black',
                  marginLeft: scale(10),
                }}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  });

  useEffect(() => {
    const allLessons =
      (data && data?.flatMap(section => section.child || [])) || [];
    // Bước 2: Lọc các lesson có quiz_test_id
    const quizTestIds = allLessons
      .map(lesson => lesson?.complete_quiz_lesson)
      .filter(Boolean);
    const url = quizTestIds.map(id => `&ids[]=${id}`).join('');
    dispatch(
      quizTest(url, auth.access_token, (error, res) => {
        setListQuiz(res);
      }),
    );
  }, [data]);

  const renderItem = ({item, index}) => {
    const filteredArray =
      item &&
      item.child &&
      item?.child.filter(item => item.status_lesson !== 1);

    return (
      <View key={index}>
        {/* Chương */}
        <View
          ref={ref => {
            if (ref) chapterRefs.current[item._id] = ref;
          }}
          style={{
            justifyContent: 'space-between',
            padding: scale(10),
            backgroundColor: colors.blue3,
            marginBottom: scale(10),
          }}>
          <Text
            style={{
              fontSize: scale(14),
              color: 'white',
              fontWeight: '600',
              width: '95%',
            }}>
            {item?.name}
          </Text>
        </View>
        {/* Danh sách bài học */}
        {filteredArray &&
          filteredArray.map((lesson, idx) => {
            const isSelected = selectedLessonId === lesson?._id;
            const isExpanded = expandedLessonId === lesson?._id;

            return (
              <View
                key={idx}
                ref={ref => {
                  if (ref && lesson._id === selectedLesson?._id) {
                    lessonRefs.current[lesson._id] = ref;
                  }
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    justifyContent: 'space-between',
                    backgroundColor: isSelected ? '#0cacea21' : '#fff', // thêm màu nền
                  }}
                  onPress={() => {
                    handlePress(lesson, 'lesson');
                    setExpandedLessonId(prev =>
                      prev === lesson?._id ? null : lesson?._id,
                    );
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Icon
                      color={lesson?.complete ? colors.blue3 : 'black'}
                      name={
                        lesson?.complete
                          ? 'checkmark-circle-outline'
                          : checkSource(lesson)
                      }
                      size={scale(15)}
                      type="ionicon"
                    />
                    {/* Bài */}
                    <Text
                      style={{
                        flexShrink: 1,
                        color: isSelected
                          ? colors.blue3
                          : lesson?.complete
                          ? colors.blue3
                          : 'black',
                        fontSize: scale(14),
                        marginLeft: scale(10),
                      }}>
                      {lesson?.name}
                    </Text>
                  </View>
                  {lesson &&
                  lesson.lesson_info &&
                  lesson.lesson_info.duration ? (
                    <Text style={{color: 'black', fontSize: scale(12)}}>
                      {formatTime(
                        (lesson &&
                          lesson.lesson_info &&
                          lesson.lesson_info.duration) ||
                          0,
                      )}
                    </Text>
                  ) : (
                    <View></View>
                  )}
                </TouchableOpacity>
                {/* Đóng mở */}
                {isExpanded && (
                  <View>
                    <View style={{marginHorizontal: scale(10)}}>
                      {!_.isEmpty(lesson?.attach_file) && (
                        <View style={{paddingLeft: scale(10)}}>
                          <Text
                            style={{
                              color: colors.blue3,
                              fontSize: scale(14),
                            }}>
                            Tài liệu
                          </Text>
                          {lesson?.attach_file.map((_it, _idx) => {
                            return (
                              <View
                                key={_idx}
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginTop: scale(10),
                                }}>
                                <Icon
                                  color={'black'}
                                  name={'file-document-outline'}
                                  size={scale(15)}
                                  type="material-community"
                                />
                                <TouchableOpacity
                                  style={{marginHorizontal: scale(10)}}
                                  onPress={() =>
                                    RouterService.navigate('RenderDocument', {
                                      link_document: _it?.url,
                                      document_info: _it,
                                    })
                                  }>
                                  <Text
                                    style={{
                                      color: 'black',
                                      fontSize: scale(12),
                                    }}>
                                    {_it?.name}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            );
                          })}
                        </View>
                      )}
                      {!_.isEmpty(lesson?.complete_quiz_lesson) && (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: scale(5),
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginLeft: scale(10),
                            }}>
                            <Icon
                              color={lesson?.complete ? colors.blue3 : 'black'}
                              name={
                                lesson?.complete
                                  ? 'checkmark-circle-outline'
                                  : 'help-circle-outline'
                              }
                              size={scale(15)}
                              type="ionicon"
                            />
                            <Text
                              style={{
                                fontSize: scale(13),
                                color: lesson?.complete
                                  ? colors.blue3
                                  : 'black',
                                marginHorizontal: scale(10),
                              }}
                              onPress={() => handlePress(lesson, 'test')}>
                              Bài kiểm tra
                            </Text>
                          </View>
                          <Text style={{fontSize: scale(12)}}>
                            {countTest(lesson)} câu
                          </Text>
                        </View>
                      )}
                      <View style={{paddingBottom: scale(5)}} />
                    </View>
                    {/* Danh sách lesson con */}
                    <ChildLessonList children={lesson?.child} />
                  </View>
                )}
              </View>
            );
          })}
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      {loadingCourse ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="small" color={colors.blue3} />
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          scrollEventThrottle={16}
          keyExtractor={(_, i) => String(i)}
          data={result || []}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default Lesson;
