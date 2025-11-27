import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import password from './password';
import setting from './setting';

import HomeTab from 'container/HomeTab';
import LearnScreen from 'container/LearnScreen';
import AccountScreen from 'container/AccountScreen';
import React, { Component } from 'react';

const Tab = createBottomTabNavigator();
function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="LearnScreen" component={LearnScreen} />
      <Tab.Screen name="AccountScreen" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default Tabs;
