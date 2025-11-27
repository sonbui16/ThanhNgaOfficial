import * as React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import _ from 'lodash';
import {Icon} from '@rneui/themed';
import {scale} from 'react-native-size-scaling';
import colors from 'variables/colors';
import RouterService from 'src/container/Router/RouterService';
const RecuisiveLesson = ({
  item,
  index,
  onQuizPress = item => {},
  selectedLesson = {},
  onSelectLesson = (item, index) => {},
  isChild = false,
}) => {
  const checkSource = item => {
    if (item?.lesson_info || item?.video) {
      return 'logo-youtube';
    } else if (item?.document_info) {
      return 'document-outline';
    } else if (item?.quiz_test_id) {
      return 'list-outline';
    } else {
      return 'caret-forward-circle-outline';
    }
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

  return (
    <View
      key={index}
      style={{
        backgroundColor:
          selectedLesson?._id === item?._id ? '#0cacea21' : '#fff',
        paddingLeft: isChild ? scale(20) : 0,
      }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-between',
        }}
        onPress={() => onSelectLesson(item, index, 'lesson')}
        key={index}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon
            color={item?.complete ? colors.blue3 : 'black'}
            name={
              item?.complete ? 'checkmark-circle-outline' : checkSource(item)
            }
            size={scale(15)}
            type="ionicon"
          />
          <Text
            style={{
              color:
                selectedLesson?._id == item?._id
                  ? colors.blue3
                  : item?.complete
                  ? colors.blue3
                  : 'black',
              fontSize: scale(14),
              // width: '95%',
              marginLeft: scale(10),
            }}>
            {item?.name}
          </Text>
        </View>
        <Text style={{color: 'black', fontSize: scale(12)}}>
          {formatTime(item?.lesson_info?.duration || 0)}
        </Text>
      </TouchableOpacity>
      <View style={{marginHorizontal: scale(10)}}>
        {!_.isEmpty(item?.attach_file) && (
          <View style={{paddingLeft: scale(10)}}>
            <Text
              style={{
                color: colors.blue3,
                fontSize: scale(14),
              }}>
              Tài liệu
            </Text>
            {item?.attach_file.map((_it, _idx) => {
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
        {!_.isEmpty(item?.complete_quiz_lesson) && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: scale(5),
              marginLeft: scale(10),
            }}>
            <Icon
              color={item?.complete ? colors.blue3 : 'black'}
              name={
                item?.complete
                  ? 'checkmark-circle-outline'
                  : 'help-circle-outline'
              }
              size={scale(15)}
              type="ionicon"
            />

            <Text                                                                                                                                                                                                                                                                                                                                                                                                                             
              style={{
                fontSize: scale(13),
                color: item?.complete ? colors.blue3 : 'black',
                marginHorizontal: scale(10),
              }}
              onPress={() => onQuizPress(item, 'test')}>
              Bài kiểm tra
            </Text>
          </View>
        )}
        <View style={{paddingBottom: scale(5)}} />
        {!_.isEmpty(item?.child) &&
          item?.child?.map((_it, _idx) => (
            <View key={_idx} style={{backgroundColor: '#fff'}}>
              <RecuisiveLesson
                isChild
                item={_it}
                index={_idx}
                onQuizPress={() => onQuizPress(_it)}
                selectedLesson={selectedLesson}
                onSelectLesson={() => onSelectLesson(_it, 1)}
              />
            </View>
          ))}
      </View>
    </View>
  );
};

export default RecuisiveLesson;
