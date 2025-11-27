import React, {memo, useState, useEffect} from 'react';

import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  ImageBackground,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {scale} from 'react-native-size-scaling';
import colors from 'colors';
import {Surface} from 'react-native-paper';
import vari from 'variables/platform';
import images from 'imagesApp';
import Apptext from 'src/components/Apptext';
import {connect} from 'react-redux';
import {courseMe, courses, coursesDetail} from 'actions/app';
import {decode} from 'html-entities';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import RouterService from 'container/Router/RouterService';

const width = Dimensions.get('window').width / 375;
const height = Dimensions.get('window').height / 812;

const CourseStudied = () => {
  const [data, setData] = useState([]);
  const site = useSelector(state => state.auth.listSite);
  const sourseList = useSelector(state => state.app.sourseList);
  const dispash = useDispatch();

  const checkTime = data => {
    if (data.end) {
      const endTime = moment(data.end);
      const currentTime = moment();

      if (endTime.isBefore(currentTime)) {
        return `${images.expired}`;
      } else {
        if (data.thumbnail_url) {
          return {uri: `${data.thumbnail_url}`};
        } else {
          return `${images.noThumb}`;
        }
      }
    } else {
      if (data.thumbnail_url) {
        return {uri: `${data.thumbnail_url}`};
      } else {
        return `${images.noThumb}`;
      }
    }
  };
  const learCourseItem = item => {
    dispash(
      coursesDetail(item._id, site.access_token, (err, data) => {
        if (err) {
          return;
        } else {
          if (data?.can_learn) {
            const dataCourse = {
              type_open_lesson: data.type_open_lesson,
            };
            RouterService.navigate('DetailLearnScreen', {
              item,
              dataCourse,
              dataType: data,
            });
          } else {
            var filteredObjects = sourseList.filter(obj =>
              data?.complete_course.includes(obj._id),
            );
            // Check : nếu điều kiện hoàn thành > 1 khoá học
            if (filteredObjects.length >= 2) {
              var name = '';
              filteredObjects.forEach(obj => {
                name += obj.name + ' - ';
              });
              name = name.slice(0, -3);
              Alert.alert(
                'Thông báo',
                `Bạn phải hoàn thành khoá học: ${decode(name)} trước`,
              );
            } else {
              Alert.alert(
                'Thông báo',
                `Bạn phải hoàn thành khoá học ${decode(
                  filteredObjects[0].name,
                )} trước`,
              );
            }
          }
        }
      }),
    );
  };

  useEffect(() => {
    dispash(
      courseMe(1, site.access_token, (err, data) => {
        if (err) {
        } else {
          setData(data?.data);
          // this.setState({data: data?.data});
        }
      }),
    );
  }, []);
  return (
    <View
      style={{
        paddingLeft: scale(10),
        marginTop: height * 5,
        overflow: 'hidden',
        paddingBottom: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 5,
        }}>
        <Apptext
          style={{
            color: '#38393D',
            fontWeight: '700',
            fontSize: scale(16),
          }}
          i18nKey="myCourse"></Apptext>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item, index}) => {
          var numberComplete =
            (item?.total_complete_lesson / item?.total_lesson) * 100;

          if (isNaN(numberComplete)) {
            numberComplete = 0;
          }
          return (
            <TouchableOpacity
              onPress={() => {
                if (item.end) {
                  const endTime = moment(item.end);
                  const currentTime = moment();

                  if (endTime.isBefore(currentTime)) {
                    Alert.alert('Thông báo', 'Đã hết thời gian học !');
                  } else {
                    learCourseItem(item);
                  }
                } else {
                  learCourseItem(item);
                }
              }}
              activeOpacity={0.8}
              style={{
                marginTop: height * 12,
                marginBottom: height * 12,
                marginRight: width * 12,
                borderColor: colors.grey1,
                overflow: 'hidden',
                borderRadius: 7,
                width: vari.width / 2.5,
                height: vari.width / 1.9,
                backgroundColor: 'white',
                justifyContent: 'space-between',
                paddingBottom: scale(7),
                borderWidth: 1,
              }}>
              <ImageBackground
                defaultSource={images.noThumb}
                resizeMode="cover"
                source={checkTime(item)}
                style={{
                  width: '100%',
                  alignItems: 'flex-end',
                  height: vari.width / 4,
                }}
              />
              <View
                style={{
                  marginHorizontal: scale(5),
                  justifyContent: 'space-between',
                }}>
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: scale(14),
                    color: colors.blue3,
                    fontWeight: 'bold',
                  }}>
                  {decode(item.name)}
                </Text>

                <View
                  style={{
                    overflow: 'hidden',
                    marginVertical: scale(19),
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: scale(4),
                      backgroundColor: '#ddd',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        width: `${
                          (item?.total_complete_lesson / item?.total_lesson) *
                            100 || 0
                        }%`,

                        height: scale(4),
                        backgroundColor: colors.blue3,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    />
                  </View>
                </View>

                <Text
                  style={{
                    color: 'black',
                    fontSize: scale(12),
                  }}>
                  {numberComplete % 1 !== 0
                    ? numberComplete.toFixed(2)
                    : numberComplete}
                  % hoàn thành
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data?.length < 0 ? (
          <Text
            style={{
              fontSize: scale(14),
              margin: scale(10),
              fontWeight: 'bold',
            }}>
            Bạn chưa có khóa học nào
          </Text>
        ) : (
          data && data.map((item, index) => this.renderItem({item, index}))
        )}
      </ScrollView> */}
    </View>
  );
};

export default CourseStudied;
