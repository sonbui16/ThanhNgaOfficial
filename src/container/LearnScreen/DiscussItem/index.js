import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Alert, Image } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-toast-message';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment';
import { scale } from 'react-native-size-scaling';
import { decode } from 'html-entities';
import HTMLView from 'react-native-render-html';

import colors from 'colors';
import vari from 'variables/platform';
import { courses, coursesDetail, checkCourse } from 'store/actions/app';
import images from 'src/assets/images';

@connect(
  state => ({
    user: state.auth.listSite,
    sourseList: state.app.sourseList,
  }),

  {
    courses,
    coursesDetail,
    checkCourse,
  },
)
export class DiscussItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onPress = item => {
    const { checkCourse } = this.props;
    checkCourse(item._id);

    if (item.end) {
      const endTime = moment(item.end);
      const currentTime = moment();

      if (endTime.isBefore(currentTime)) {
        Alert.alert('Thông báo', 'Đã hết thời gian học !');
      } else {
        this.learCourseItem(item);
      }
    } else {
      this.learCourseItem(item);
    }
  };
  learCourseItem = item => {
    const { user, courses, listData, coursesDetail, sourseList } = this.props;
    coursesDetail(item._id, user.access_token, (err, data) => {
      if (err) {
        return;
      } else {
        if (data?.can_learn) {
          const dataCourse = {
            type_open_lesson: data.type_open_lesson,
          };
          this.props.navigation.navigate('DetailLearnScreen', {
            item,
            dataCourse,
            dataType: data,
          });
        } else {
          var filteredObjects = listData.filter(obj =>
            data?.complete_course.includes(obj._id),
          );

          // Check : nếu điều kiện hoàn thành > 1 khoá học
          if (filteredObjects.length >= 2) {
            var name = '';
            filteredObjects.forEach(obj => {
              name += obj.name + ' - ';
            });
            name = name.slice(0, -3);

            Toast.show({
              type: 'error',
              text1: 'Thông báo',
              text2: `Bạn phải hoàn thành khoá học: ${decode(name)} trước`,
            });
          } else {
            Toast.show({
              type: 'error',
              text1: 'Thông báo',
              text2: `Bạn phải hoàn thành khoá học ${decode(
                filteredObjects[0]?.name,
              )} trước`,
            });
          }
        }
      }
    });
  };

  sourceImg = data => {
    const isValidImageUrl = url => {
      try {
        if (typeof url !== 'string') return false;
        if (!url.startsWith('http')) return false;
        new URL(url); // kiểm tra URL hợp lệ
        return true;
      } catch (e) {
        return false;
      }
    };

    if (data?.end) {
      const endTime = moment(data.end);
      const currentTime = moment();
      if (endTime.isBefore(currentTime)) {
        return `${images.expired}`;
      }
    }
    const url = data?.thumbnail_url;
    if (isValidImageUrl(url)) {
      return { uri: url };
    }
    return `${images.noThumb}`;
  };

  render() {
    const { data } = this.props;
    var numberComplete =
      (data?.total_complete_lesson / data?.total_lesson) * 100 || 0;

    return (
      <View style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity
          onPress={() => this.onPress(data)}
          style={{
            marginTop: scale(10),
            flexDirection: 'row',
            overflow: 'hidden',
            height: DeviceInfo.isTablet() ? vari.width / 5 : vari.width / 4,
            alignItems: 'center',
          }}
        >
          <Image
            defaultSource={images.noThumb}
            source={this.sourceImg(data)}
            resizeMode="contain"
            style={{
              height: DeviceInfo.isTablet()
                ? vari.width / 2 / 1.5
                : vari.width / 2 / 2,
              width: vari.width / 2 / 2,
            }}
          />
          <View
            style={{
              justifyContent: 'space-evenly',
              height: DeviceInfo.isTablet() ? vari.width / 5 : vari.width / 4,
              width: vari.width - vari.width / 2 / 1.5,
              paddingLeft: 10,
            }}
          >
            <HTMLView
              source={{ html: data?.name }}
              containerStyle={{}}
              allowedStyles={[]}
              tagsStyles={{
                body: { color: colors.blue3, fontSize: scale(14) },
              }}
            />
            <View
              style={{
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  width: '100%',
                  height: scale(4),
                  backgroundColor: '#ddd',
                  justifyContent: 'center',
                }}
              >
                <View
                  style={{
                    width: `${
                      (data?.total_complete_lesson / data?.total_lesson) *
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
            <Text style={{ color: 'white', fontSize: scale(12) }}>
              {numberComplete % 1 !== 0
                ? numberComplete.toFixed(2)
                : numberComplete}
              % hoàn thành
            </Text>
            {data?.start && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: scale(12),
                    fontWeight: 'bold',
                    color: 'white',
                  }}
                >
                  Thời gian:{' '}
                </Text>
                <Text style={{ fontSize: scale(9), color: 'white' }}>
                  {moment(data?.start).format('DD/MM/YYYY HH:mm')} -{' '}
                  {moment(data?.end).format('DD/MM/YYYY HH:mm')}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
export default DiscussItem;
