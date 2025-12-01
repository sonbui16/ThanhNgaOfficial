import React, { Component, useState } from 'react';
import {
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import vari from 'variables/platform';
import { isRequestPending } from 'selectors/common';
import { registerEdubit2 } from 'store/actions/auth';
import images from 'imagesApp';
import FloatingLabelInput from 'components/FloatingLabelInput';
import AuthButton from 'components/AuthButton';
import ViewBackground from 'components/ViewBackground';
import { scale } from 'react-native-size-scaling';

import colors from 'colors/';
import Apptext from 'src/components/Apptext';
import ShowAlert from 'src/components/ShowAlert';
import { TextInput } from 'react-native-paper';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassWord, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [isShowPass, setIsShowPass] = useState(true);
  const [isShowRePass, setIsShowRePass] = useState(true);

  const dispatch = useDispatch();
  const language = useSelector(state => state.app.language);
  const loading = useSelector(state =>
    isRequestPending(state, 'registerEdubit2'),
  );
  const showAlert = message => {
    switch (message) {
      case 'Nhập lại mật khẩu không khớp':
        Alert.alert('Thông báo', message);
        break;
      case 'Đăng kí tài khoản thành công':
        Alert.alert(
          'Thông báo',
          message,
          [
            {
              text: 'Quay lại',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: async () => {
                navigation.goBack();
              },
            },
          ],
          { cancelable: false },
        );
        break;
      default:
        Alert.alert('Thông báo', message);
        break;
    }
  };
  const onPressShowPass = () => {
    setIsShowPass(!isShowPass);
  };
  const onPressShowRePass = () => {
    setIsShowRePass(!isShowRePass);
  };
  const goRegister = values => {
    const infoInput = {};
    infoInput.name = values.name;
    infoInput.email = values.email;
    infoInput.password = values.password;
    infoInput.phone = values.phone;
    let errorMessage = [];
    if (name.length < 3) {
      showAlert('Họ tên phải dài hơn hoặc bằng 3 ký tự');
      return;
    }
    if (password !== confirmPassWord) {
      showAlert('Nhập lại mật khẩu không khớp');
    } else if (password.length < 6) {
      showAlert(`Mật khẩu phải tối thiểu 6 kí tự`);
    } else {
      dispatch(
        registerEdubit2(infoInput, (err, data) => {
          if (err) {
            console.log('sonbh12', err);

            let errMessage = err?.message?.message;

            if (Array.isArray(errMessage)) {
              errorMessage = err?.message?.message[0]?.constraints;
              let titleErr = '';
              switch (`${Object.values(errorMessage)}`) {
                case 'email must be an email':
                  titleErr = 'Vui lòng nhập đúng email !';
                  break;
                default:
                  titleErr = `${Object.values(errorMessage)}`;
                  break;
              }
              // err.customMessage = titleErr;
              showAlert(titleErr);
              return;
            } else {
              showAlert(err?.message?.message);
              return;
            }
          } else {
            Alert.alert('Thông báo', `${data?.message}`, [
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
    }
  };
  const onBackdropPress = () => {
    setVisible(!visible);
  };
  const disButton = () => {
    if (
      email === '' ||
      name === '' ||
      password === '' ||
      confirmPassWord === ''
    ) {
      return true;
    } else return false;
  };
  const renderContainer = () => {
    return (
      <View
        style={{
          flex: 1,
          // backgroundColor: 'white',
          paddingHorizontal: scale(20),
        }}
      >
        <ScrollView style={{}} showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                marginVertical: scale(10),
                color: 'white',
                fontSize: scale(14),
              }}
            >
              Họ và tên<Text style={{ color: 'red' }}>*</Text>
            </Text>
            <FloatingLabelInput
              maxLength={34}
              label={language === 'en' ? 'Full name' : 'Họ và tên'}
              value={name}
              onChangeText={value => setName(value)}
            />
            <Text
              style={{
                marginVertical: scale(10),
                color: 'white',
                fontSize: scale(14),
              }}
            >
              Email<Text style={{ color: 'red' }}>*</Text>
            </Text>
            <FloatingLabelInput
              maxLength={34}
              label="Email"
              value={email}
              onChangeText={value => setEmail(value)}
            />
            <Text
              style={{
                fontSize: scale(14),
                color: 'white',
                marginVertical: scale(10),
              }}
            >
              Số điện thoại
            </Text>
            <FloatingLabelInput
              keyboardType={'phone-pad'}
              maxLength={25}
              iconImg={images.phone}
              label={language === 'en' ? 'Phone number' : 'Nhập số điện thoại'}
              value={phone}
              onChangeText={value => setPhone(value)}
            />
            <Text
              style={{
                fontSize: scale(14),
                color: 'white',
                marginVertical: scale(10),
              }}
            >
              Mật khẩu<Text style={{ color: 'red' }}>*</Text>
            </Text>
            <FloatingLabelInput
              onPressShowPass={() => onPressShowPass()}
              showIcon={true}
              isShowPass={isShowPass}
              secureTextEntry={isShowPass}
              maxLength={25}
              right={
                <TextInput.Icon
                  onPress={() => {
                    onPressShowPass();
                  }}
                  icon={isShowPass ? 'eye' : 'eye-off'}
                  style={{ alignItems: 'center', marginTop: scale(10) }}
                />
              }
              label={language === 'en' ? 'Password' : 'Mật khẩu'}
              value={password}
              onChangeText={value => setPassword(value)}
            />
            <Text
              style={{
                fontSize: scale(14),
                color: 'white',
                marginVertical: scale(10),
              }}
            >
              Nhập lại mật khẩu<Text style={{ color: 'red' }}>*</Text>
            </Text>
            <FloatingLabelInput
              onPressShowPass={() => onPressShowRePass()}
              isShowPass={isShowRePass}
              showIcon={true}
              secureTextEntry={isShowRePass}
              maxLength={25}
              label={'Nhập lại mật khẩu '}
              right={
                <TextInput.Icon
                  onPress={() => {
                    onPressShowRePass();
                  }}
                  icon={isShowRePass ? 'eye' : 'eye-off'}
                  style={{ alignItems: 'center', marginTop: scale(10) }}
                />
              }
              value={confirmPassWord}
              onChangeText={value => setConfirmPassword(value)}
            />

            <AuthButton
              disabled={disButton()}
              loading={loading}
              onPress={() =>
                goRegister({
                  name,
                  email,
                  password,
                  confirmPassWord,
                  phone,
                })
              }
              text="ĐĂNG KÝ"
              containerStyle={{ backgroundColor: colors.blue3 }}
            />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginVertical: vari.ipad ? 20 : 10,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 30,
              }}
            >
              <Apptext
                style={{ color: colors.grey2 }}
                i18nKey={'Bạn đã có tài khoản?'}
              />
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Apptext
                  style={{ color: colors.blue3, fontWeight: '600' }}
                  i18nKey={' ĐĂNG NHẬP'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <ViewBackground style={{ flex: 1 }}>
      <ShowAlert
        isVisible={visible}
        onBackdropPress={() => onBackdropPress()}
        title={title}
      />
      {renderContainer()}
    </ViewBackground>
  );
};

export default RegisterScreen;
