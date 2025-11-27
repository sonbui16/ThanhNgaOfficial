import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Platform, Image } from 'react-native';
import TabNavigation from 'container/Router/TabNavigation';

import SplashScreen from 'container/SplashScreen';
import LoginScreen from 'container/Auth/LoginScreen';

import RegisterScreen from 'container/Auth/RegisterScreen';
import TwoFactor from 'container/Auth/TwoFactor';

import ForgetPass from 'container/Auth/ForgetPass';
import NextScreen from 'container/HomeTab/NextScreen';
import ListSchools from 'container/Auth/ListSchools';

import CourseDetail from 'container/HomeTab/CourseDetail';
import DetailLearnScreen from 'container/LearnScreen/DetailLearnScreen';
import Settings from 'container/AccountScreen/Settings';
import DeleteAcount from 'container/AccountScreen/DeleteAcount';
import DocumentInfo from 'container/LearnScreen/DocumentInfo';
import TestScreen from 'container/LearnScreen/TestScreen';
import TextContent from 'container/LearnScreen/TextContent';
import FlashcardScreen from 'container/LearnScreen/FlashcardScreen';
import RenderDocument from 'container/LearnScreen/DetailLearnScreen/RenderDocument';
import PrivacyPolicy from 'container/AccountScreen/PrivacyPolicy';

import ChangeAccount from 'container/AccountScreen/ChangeAccount';
import ChangePass from 'container/Auth/ChangePass';
import Loading from 'components/Loading';
import images from 'imagesApp';
import colors from 'variables/colors';

const Stack = createNativeStackNavigator();
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        // animation: 'ios',
        presentation: 'card',
        headerBackTitle: 'Quay lại',
        orientation: 'portrait',
        headerTintColor: colors.blue3,
      }}
      initialRouteName="SplashScreen"
    >
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerTitle: 'Tạo tài khoản',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="TwoFactor"
        component={TwoFactor}
        options={{
          headerTitle: 'Xác thực hai yếu tố',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="ForgetPass"
        component={ForgetPass}
        options={{
          headerTitle: 'Quên mật khẩu',
          headerShown: true,
        }}
      />
      {/* Xem thêm */}
      <Stack.Screen name="NextScreen" component={NextScreen} />
      {/* Đổi trường */}
      <Stack.Screen name="ListSchools" component={ListSchools} />
      {/* Chi tiết khoá học */}
      <Stack.Screen
        name="CourseDetail"
        component={CourseDetail}
        options={{
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="DetailLearnScreen"
        component={DetailLearnScreen}
        // options={{
        // headerShown: tr,
        // orientation: 'all',
        // }}

        options={({ route }) => {
          return {
            headerShown: false,
            // orientation:
            // route.params.lockToPortrait === 'portrait' ? 'portrait' : 'all',
            orientation: Platform.OS === 'android' ? 'portrait' : 'all',
          };
        }}
      />
      {/* Cài đặt và bảo mật */}
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTitle: 'Cài đặt',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="DeleteAcount"
        component={DeleteAcount}
        options={{
          headerTitle: 'Xoá tài khoản',
        }}
      />
      <Stack.Screen
        name="DocumentInfo"
        component={DocumentInfo}
        options={{
          headerTitle: 'Tài liệu',
        }}
      />
      {/* Bài kiểm tra */}
      <Stack.Screen
        name="TestScreen"
        component={TestScreen}
        options={{
          headerTitle: 'Bài kiểm tra',
        }}
      />
      <Stack.Screen
        name="TextContent"
        component={TextContent}
        options={({ route }) => ({
          headerTitle: route.params.data.name || '',
        })}
      />
      <Stack.Screen
        name="FlashcardScreen"
        component={FlashcardScreen}
        options={({ route }) => ({
          headerTitle: route.params.data.name || 'Flashcards',
          orientation: 'all',
        })}
      />
      {/* Hiển thị tài liệu */}
      <Stack.Screen
        name="RenderDocument"
        component={RenderDocument}
        options={{
          headerTitle: 'Tài liệu',
        }}
      />

      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="ChangeAccount" component={ChangeAccount} />
      <Stack.Screen name="ChangePass" component={ChangePass} />
      <Stack.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
export default AuthStack;
