import React, { Component, useState, useEffect } from 'react';
import { Text } from 'react-native';
import { useDispatch } from 'react-redux';

import SafeAreaViews from 'components/SafeAreaView';
import { ListItem, Switch } from '@rneui/themed';
import { scale } from 'react-native-size-scaling';
import ViewBackground from 'src/components/ViewBackground';
import colors from 'colors';

import { getList as getCourseList } from '../../../services/course';
import {
  setNextLesson,
  disableNextLesson,
  useNextLesson,
} from '../../../features/video';

const Settings = ({ navigation }) => {
  const dispatch = useDispatch();
  const checked = useNextLesson();

  return (
    <ViewBackground style={{ flex: 1 }}>
      <ListItem
        containerStyle={{
          backgroundColor: 'transparent',
          color: colors.blue3,
        }}
      >
        <ListItem.Content>
          <Text style={{ fontSize: scale(14), color: colors.blue3 }}>
            Cho phép tự động chuyển bài học
          </Text>
        </ListItem.Content>
        <Switch
          value={checked}
          onValueChange={value => {
            if (value) {
              dispatch(setNextLesson());
            } else {
              dispatch(disableNextLesson());
            }
          }}
        />
      </ListItem>
    </ViewBackground>
  );
};

export default Settings;
