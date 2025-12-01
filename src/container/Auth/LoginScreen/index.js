import React, { useEffect, useState } from 'react';
import {
  Image,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  Platform,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { scale } from 'react-native-size-scaling';
import { TextInput } from 'react-native-paper';
import DeviceInfo from 'react-native-device-info';
import SHA1 from 'crypto-js/sha1';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import _ from 'lodash';
import { CheckBox, Icon } from '@rneui/themed';

import images from 'src/assets/images';
import { site_id } from 'store/api/common';
import { isRequestPending } from 'selectors/common';
import { setAuthState, loginSites, methodMFA } from 'store/actions/auth';
import {
  saveListItem,
  saveListSite,
  checkSite,
  inforSite,
} from 'store/actions';
import { devicesLimitCheck } from 'store/actions/app';
import FloatingLabelInput from 'components/FloatingLabelInput';
import AuthButton from 'components/AuthButton';
import ViewBackground from 'components/ViewBackground';
import vari from 'variables/platform';
import colors from 'colors/';
import Apptext from 'src/components/Apptext';
import RouterService from 'src/container/Router/RouterService';

const LoginScreen = ({ navigation, route }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [checkSaveAccount, setCheckSaveAccount] = useState(false);
  const [isShowPass, setIsShowPass] = useState(true);
  const [addDevices, setAddDevices] = useState({});
  const dispatch = useDispatch();
  const attachDevices = async () => {
    setAddDevices({
      ip: await DeviceInfo.getIpAddress(),
      os: Platform.OS ?? '',
      os_version: Platform.Version,
      brand: DeviceInfo.getBrand() ?? '',
      device_unique_id: await DeviceInfo.getUniqueId(),
      device_name: (await DeviceInfo.getDeviceName()) ?? '',
      hardware: await DeviceInfo.getHardware(),
      last_update_time: moment(new Date()).format(),
      mac_address: await DeviceInfo.getMacAddress().then(mac => {
        return mac;
      }),
      manufacturer: await DeviceInfo.getManufacturer(),
      user_agent: (await DeviceInfo.getUserAgent()) ?? '',
      is_emulator: await DeviceInfo.isEmulator(),
      type: 'app',
    });
  };
  const onPressSaveAccount = () => {
    setCheckSaveAccount(!checkSaveAccount);
  };
  const getAccount = async () => {
    const value = await AsyncStorage.getItem('saveAccount');
    setCheckSaveAccount(value ? true : false);
    setEmail(value);
  };
  useEffect(() => {
    getAccount();
  }, []);
  useEffect(() => {
    attachDevices();
  }, []);

  const onPressShowPass = () => {
    setIsShowPass(!isShowPass);
  };
  const handleForgot = item => {
    navigation.navigate('ForgetPass');
  };
  async function proceedLogin(dataSite, values) {
    let tokenDevices = {
      token: SHA1(addDevices.token).toString(),
    };
    await AsyncStorage.setItem('tokenDevices', tokenDevices.token);
    // dispatch(
    //   devicesLimitCheck(
    //     tokenDevices,
    //     dataSite.access_token,
    //     (errLimit, dataLimit) => {
    //       if (!errLimit) {
    //         dispatch(saveListSite(dataSite));
    //         dispatch(saveListItem(site_id));
    //         dispatch(setAuthState(true));
    //         dispatch(checkSite(true));
    //         RouterService.reset('TabNavigation');
    //       } else {
    //         Alert.alert('Thông báo', errLimit?.message?.message);
    //       }
    //     },
    //   ),
    // );

    dispatch(saveListSite(dataSite));
    dispatch(saveListItem(site_id));
    dispatch(setAuthState(true));
    dispatch(checkSite(true));
    RouterService.reset('TabNavigation');
  }

  const disButton = () => {
    return email?.trim() === '' || password?.trim() === '';
  };
  const goSubmit = async values => {
    const currentBrowser = JSON.stringify({
      ip: await DeviceInfo.getIpAddress(),
      os: Platform.OS ?? '',
      os_version: Platform.Version,
      brand: DeviceInfo.getBrand() ?? '',
      device_unique_id: await DeviceInfo.getUniqueId(),
      device_name: (await DeviceInfo.getDeviceName()) ?? '',
      hardware: await DeviceInfo.getHardware(),
      last_update_time: moment(new Date()).format(),
      mac_address: await DeviceInfo.getMacAddress().then(mac => {
        return mac;
      }),
      manufacturer: await DeviceInfo.getManufacturer(),
      user_agent: (await DeviceInfo.getUserAgent()) ?? '',
      is_emulator: await DeviceInfo.isEmulator(),
      type: 'app',
    });
    dispatch(
      loginSites(values, currentBrowser, (err, dataSite) => {
        if (!err) {
          dispatch(
            inforSite(site_id, dataSite.access_token, (err, data) => {}),
          );
          dispatch(
            methodMFA(dataSite.access_token, (errMethod, dataMethod) => {
              if (errMethod) {
                proceedLogin(dataSite, values);
                return;
              }
              if (dataMethod?.two_factor_enabled || dataMethod?.email_enabled) {
                navigation.navigate('TwoFactor', {
                  token: dataSite.access_token,
                  email: email,
                  dataMethod,
                  handleProceedLogin: () => proceedLogin(dataSite, values),
                });
              }
            }),
          );
        } else {
          let errMess = err?.message?.message;
          if (Array.isArray(errMess)) {
            const errMessage = errMess[0]?.constraints;
            const valueErr = Object.values(errMessage)[0];
            let titleErr = '';
            switch (valueErr) {
              case 'email must be an email':
              case 'username must be an email':
                titleErr = 'Vui lòng nhập đúng email !';
                break;
              case 'name must be shorter than or equal to 50 characters':
                titleErr = 'Họ và tên phải ngắn hơn hoặc bằng 50 ký tự';
                break;
              case 'name must be longer than or equal to 3 characters':
                titleErr = 'Họ tên phải dài hơn hoặc bằng 3 ký tự';
                break;
              default:
                titleErr = valueErr;
                break;
            }
            Alert.alert('Thông báo', `${titleErr}`);
          } else {
            Alert.alert('Thông báo', err?.message?.message);
          }

          if (_.isArray(err?.message?.errors)) {
            const errMessage = err?.message?.errors[0]?.constraints;
            const valueErr = Object.values(errMessage)[0];

            let titleErr = '';
            switch (valueErr) {
              case 'email must be an email':
                titleErr = 'Vui lòng nhập đúng email !';
                break;

              default:
                titleErr = valueErr;
                break;
            }

            err.customMessage = `${titleErr}`;
          } else {
            if (err?.message?.message === 'Unauthorized') {
              err.customMessage =
                'Email hoặc mật khẩu không đúng.Vui lòng thử lại';
            }
          }
        }
      }),
    );
  };

  return (
    <ViewBackground style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={images.logo}
            style={{
              width: '50%',
              height: vari.width / 2.2,
              tintColor: colors.blue3,
            }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: scale(14), color: 'white' }}>
            Giải pháp dạy học trực tuyến
          </Text>

          <Text
            style={{
              color: 'white',
              fontSize: scale(20),
              fontWeight: 'bold',
              textAlign: 'center',
              marginVertical: scale(20),
            }}
          >
            ĐĂNG NHẬP
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            margin: scale(10),
            padding: scale(10),
            borderRadius: scale(7),
            justifyContent: 'space-evenly',
            marginTop: scale(20),
          }}
        >
          <FloatingLabelInput
            label="Email"
            value={email}
            onChangeText={value => setEmail(value.trim())}
          />
          <View style={{ height: 15 }}></View>
          <FloatingLabelInput
            onPressShowPass={() => onPressShowPass()}
            showIcon={true}
            isShowPass={isShowPass}
            secureTextEntry={isShowPass}
            right={
              <TextInput.Icon
                onPress={() => {
                  onPressShowPass();
                }}
                icon={isShowPass ? 'eye' : 'eye-off'}
                style={{ alignItems: 'center', marginTop: scale(10) }}
              />
            }
            label={'Mật khẩu'}
            value={password}
            onChangeText={value => {
              setPassword(value);
            }}
          />

          <AuthButton
            containerStyle={{ backgroundColor: colors.blue3 }}
            disabled={disButton()}
            onPress={() => {
              goSubmit({
                site_id: site_id,
                username: email,
                password: password,
              });
            }}
            text="ĐĂNG NHẬP"
          />
          <CheckBox
            title={'Lưu tài khoản'}
            textStyle={{
              fontSize: scale(14),
              color: 'grey',
              fontWeight: 'normal',
            }}
            checkedIcon={
              <Icon
                name="radio-button-checked"
                type="material"
                color={colors.blue3}
                size={20}
                iconStyle={{ marginRight: 10 }}
              />
            }
            uncheckedIcon={
              <Icon
                name="radio-button-unchecked"
                type="material"
                color="grey"
                size={20}
                iconStyle={{ marginRight: 10 }}
              />
            }
            size={scale(17)}
            onPress={() => onPressSaveAccount()}
            checked={checkSaveAccount}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingVertical: scale(10),
            }}
          >
            <TouchableOpacity onPress={() => handleForgot()}>
              <Apptext i18nKey={'Quên mật khẩu ?'} style={{ color: 'black' }} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: scale(90),
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <Apptext
            i18nKey={'Bạn chưa có tài khoản?'}
            style={{ color: 'grey', fontSize: scale(12) }}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('RegisterScreen')}
          >
            <Apptext
              i18nKey={' ĐĂNG KÝ'}
              style={{
                color: 'white',
                fontWeight: '700',
                fontSize: scale(12),
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ViewBackground>
  );
};
export default LoginScreen;
