import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Image } from 'react-native';

import HomeTab from 'container/HomeTab';
import LearnScreen from 'container/LearnScreen';
import AccountScreen from 'container/AccountScreen';
import colors from 'colors';
import Membership from 'container/LearnScreen/Membership';
import images from 'imagesApp';

const Tab = createBottomTabNavigator();
const homeName = 'Trang chủ';
const learnName = 'Vào học';
const membershipName = 'Membership';
const accountName = 'Tài khoản';

function Tabs() {
  const user = useSelector(state => state.auth.infoUseMe);
  const infoSite = useSelector(state => state.auth.infoSite);

  const foundObject =
    user &&
    user.memberships &&
    user.memberships.find(item => item.sid === infoSite?._id);
  const timeToCompare = moment(foundObject?.end);
  const currentTime = moment();
  const isTimeBeforeCurrentTime = timeToCompare.isBefore(currentTime);
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        headerShown: true,
        headerTintColor: colors.blue3,
        tabBarStyle: { backgroundColor: 'black' },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === learnName) {
            iconName = focused ? 'play-circle' : 'play-circle-outline';
          } else if (rn === membershipName) {
            iconName = focused ? 'wallet-membership' : 'wallet-membership';
          } else if (rn === accountName) {
            iconName = focused ? 'account-circle' : 'account-circle-outline';
          }
          return (
            <Icon
              name={iconName}
              size={size}
              color={color}
              type="material-community"
            />
          );
        },
        tabBarActiveTintColor: colors.blue3,
        tabBarInactiveTintColor: 'grey',
        headerBackground: () => (
          <Image
            source={images.imgb} // Replace with your image path
            style={{ flex: 1 }} // Make the image fill the header space
            resizeMode="cover"
          />
        ),
      })}
    >
      <Tab.Screen
        name={homeName}
        component={HomeTab}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={learnName}
        component={LearnScreen}
        options={{
          headerTitle: 'Khoá học của tôi',
        }}
      />
      {infoSite?.membership?.status &&
        foundObject &&
        !isTimeBeforeCurrentTime && (
          <Tab.Screen
            name={membershipName}
            component={Membership}
            options={{
              headerTitle: 'Khoá học của tôi',
            }}
          />
        )}
      <Tab.Screen
        name={accountName}
        component={AccountScreen}
        options={{
          headerTitle: 'Tài khoản',
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
