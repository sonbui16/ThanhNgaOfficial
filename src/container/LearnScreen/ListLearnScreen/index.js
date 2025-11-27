import React, { useState, useCallback } from 'react';
import { FlatList, ActivityIndicator, View, Text, Alert } from 'react-native';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { scale } from 'react-native-size-scaling';
import { useFocusEffect } from '@react-navigation/native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import colors from 'colors/';
import { courseMe } from 'actions/app';
import { isRequestPending } from 'selectors/common';
import DiscussItem from '../DiscussItem';
import vari from 'variables/platform';
const AnimatedFlatList = Animated.FlatList;

const ListLearnScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [firstLoading, setFirstLoading] = useState(true);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth.listSite);
  const store = useStore();

  const loading = useSelector(state => isRequestPending(state, 'courseMe'));
  const renderEmptyContainer = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          height: vari.height / 1.5,
          alignItems: 'center',
        }}
      >
        <Text
          style={{ fontSize: scale(14), textAlign: 'center', color: 'black' }}
        >
          Bạn chưa có khoá học nào
        </Text>
      </View>
    );
  };
  useFocusEffect(
    useCallback(() => {
      const state = store.getState();
      const courseChoose = state.app.idCourse;
      dispatch(
        courseMe(1, auth.access_token, (error, res) => {
          if (error) {
            setFirstLoading(false);
            return;
          }
          let newData = res?.data || [];
          // Tìm và đưa khóa học được chọn lên đầu
          const selectedIndex = newData.findIndex(
            item => item?._id === courseChoose,
          );

          if (selectedIndex !== -1) {
            const selectedCourse = newData[selectedIndex];
            newData.splice(selectedIndex, 1); // Xoá khỏi vị trí cũ
            newData.unshift(selectedCourse); // Thêm lên đầu
          }

          setData(prev => {
            const isDifferent =
              JSON.stringify(newData) !== JSON.stringify(prev);
            return isDifferent ? newData : prev;
          });
          setFirstLoading(false);
        }),
      );
    }, [dispatch]),
  );

  const renderItem = ({ item, index }) => {
    return (
      <DiscussItem
        key={index}
        data={item}
        listData={data}
        navigation={navigation}
      />
    );
  };
  if (firstLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="small" color={colors.blue3} />
      </View>
    );
  }

  return (
    <AnimatedFlatList
      style={{}}
      data={data}
      keyExtractor={(item, index) => item._id}
      renderItem={renderItem}
      ListEmptyComponent={renderEmptyContainer()}
      itemLayoutAnimation={LinearTransition}
    />
  );
};
export default ListLearnScreen;
