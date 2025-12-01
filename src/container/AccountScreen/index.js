import {
  TouchableOpacity,
  Image,
  Linking,
  Platform,
  Text,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { scale } from 'react-native-size-scaling';
import { ListItem, Button } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode } from 'html-entities';
import DeviceInfo from 'react-native-device-info';

import colors from 'colors';
import images from 'imagesApp';
import { usersMe } from 'actions/app';
import { removeLoggedUser, logout } from 'actions/auth';
import vari from '../../../theme/variables/platform';
import Apptext from 'src/components/Apptext';
import { Dialog, Portal } from 'react-native-paper';
import RouterService from 'container/Router/RouterService';
import { isRequestPending } from 'src/store/selectors';
import ViewBackground from 'src/components/ViewBackground';

const AccountScreen = () => {
  const [detailUser, setDetailUser] = useState([]);
  const [visibleLogout, setVisibleLogout] = useState(false);

  const dispatch = useDispatch();
  const stateVisibleLogout = () => {
    setVisibleLogout(!visibleLogout);
  };
  const language = useSelector(state => state);
  const loggedIn = useSelector(state => state.auth.loggedIn);

  const loading = useSelector(state => isRequestPending(state, 'logout'));

  const logoutScreen = async () => {
    // let tokenDevices = {token: SHA1(addDevices.token).toString()};
    const value = await AsyncStorage.getItem('tokenDevices');
    dispatch(
      logout(value, language.auth.listSite.access_token, (err, data) => {
        dispatch(removeLoggedUser());
        setVisibleLogout(!visibleLogout);
        RouterService.reset('SplashScreen');
      }),
    );
  };

  // Tạo mảng các menu item
  const menuItems = [
    // {
    //   key: 'reviewApp',
    //   title: 'Đánh giá ứng dụng',
    //   onPress: () => checkDeviceID('reviewApp'),
    //   login: true,
    // },

    // {
    //   key: 'term',
    //   title: 'Điều khoản dịch vụ',
    //   login: true,
    //   onPress: () => RouterService.navigate('PrivacyPolicy', { type: 'term' }),
    // },
    // {
    //   key: 'privacy',
    //   title: 'Chính sách bảo mật',
    //   login: true,
    //   onPress: () =>
    //     RouterService.navigate('PrivacyPolicy', { type: 'privacy' }),
    // },
    {
      key: 'deleteAccount',
      title: 'Xoá tài khoản',
      login: loggedIn,

      onPress: () => RouterService.navigate('DeleteAcount'),
    },
    {
      key: 'setting',
      title: 'Cài đặt',
      login: true,
      onPress: () => RouterService.navigate('Settings'),
    },
  ];

  useEffect(() => {
    dispatch(
      usersMe(language.auth.listSite.access_token, (err, data) => {
        if (err) {
        } else {
          setDetailUser(data);
        }
      }),
    );
  }, []);
  let chuoiMoi = detailUser?.fullname?.replace(/\s*\d+T$/gi, '');
  let version = DeviceInfo.getVersion();

  const checkDeviceID = async type => {
    switch (type) {
      case 'none':
        break;
      case 'customer':
        Linking.openURL(`tel:` + '0904886098');
        break;
      case 'reviewApp':
        Linking.openURL(
          Platform.OS === 'ios'
            ? `itms-apps://itunes.apple.com/us/app/id${1495012373}?mt=8`
            : `https://play.google.com/store/apps/details?id=com.edubit`,
        );
        break;

      case 'screenSetting':
        RouterService.navigate('Settings');
        break;
      case 'listSchools':
        RouterService.navigate('ListSchools');
        break;
      case 'ListCourse':
        RouterService.navigate('ListCourse');
        break;

      default:
        break;
    }
  };
  return (
    <ViewBackground style={{ flex: 1 }}>
      {loggedIn && (
        <View
          style={{
            paddingHorizontal: 10,
            height: vari.width / 2,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginVertical: scale(5),
          }}
        >
          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems: 'center' }}
            disabled={true}
            onPress={() => RouterService.navigate('ChangePass')}
          >
            <Image
              defaultSource={images.avatar}
              source={{ uri: detailUser?.photo }}
              style={{
                height: DeviceInfo.isTablet() ? scale(60) : scale(84),
                width: DeviceInfo.isTablet() ? scale(60) : scale(84),
                borderRadius: DeviceInfo.isTablet() ? scale(30) : scale(42),
              }}
              resizeMode="cover"
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginVertical: 10,
                color: colors.blue3,
              }}
            >
              {decode(chuoiMoi)}
            </Text>
            <Text style={{ fontSize: scale(14), color: colors.blue3 }}>
              {detailUser.email}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {menuItems
        .filter(item => item.login)
        .map(item => (
          <ListItem
            containerStyle={{
              backgroundColor: 'transparent',
              color: colors.blue3,
            }}
            key={item.key}
            onPress={item.onPress}
          >
            <ListItem.Content key={item.key}>
              <Apptext
                key={item.key}
                i18nKey={item.title}
                style={{ color: colors.blue3 }}
              />
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}

      <TouchableOpacity
        onPress={() => {
          loggedIn
            ? setVisibleLogout(!visibleLogout)
            : RouterService.navigate('LoginScreen');
        }}
        style={{
          height: scale(55),
          marginHorizontal: scale(5),
          borderRadius: scale(5),
          flexDirection: 'row',
          marginTop: scale(5),
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: scale(3),
        }}
      >
        <Image
          source={images.iconSingout}
          style={{
            marginHorizontal: scale(5),
            height: DeviceInfo.isTablet() ? scale(10) : scale(20),
            width: DeviceInfo.isTablet() ? scale(10) : scale(20),
            tintColor: '#FF0000',
          }}
          resizeMode="contain"
        />

        <Apptext
          style={{ color: '#FF0000' }}
          i18nKey={loggedIn ? 'ĐĂNG XUẤT' : 'ĐĂNG NHẬP'}
        />
      </TouchableOpacity>

      <View style={{ justifyContent: 'flex-end', marginTop: 20 }}>
        <Text
          style={{
            color: colors.blue3,
            fontSize: scale(12),
            textAlign: 'center',
            justifyContent: 'flex-end',
          }}
        >
          Thanh Nga Official v{version}
        </Text>
      </View>

      <View>
        <Portal>
          <Dialog
            visible={visibleLogout}
            style={{
              backgroundColor: 'white',
              borderRadius: scale(15),
            }}
            onDismiss={stateVisibleLogout}
          >
            <Dialog.Title
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: scale(16),
                color: 'black',
              }}
            >
              Đăng xuất
            </Dialog.Title>
            <Dialog.Content>
              <Apptext
                style={{
                  textAlign: 'center',
                  fontSize: scale(14),
                  color: 'black',
                }}
                i18nKey={'Bạn có chắc chắn muốn đăng xuất ?'}
              />
            </Dialog.Content>
            <Dialog.Actions style={{ flexDirection: 'row' }}>
              <Button color="error" onPress={stateVisibleLogout}>
                <Apptext
                  style={{ color: 'white', fontSize: scale(14) }}
                  i18nKey={'Huỷ'}
                />
              </Button>
              <Button
                loading={loading}
                onPress={logoutScreen}
                buttonStyle={{
                  backgroundColor: 'grey',
                  borderRadius: 3,
                  marginLeft: scale(10),
                }}
              >
                <Apptext
                  style={{ color: 'white', fontSize: scale(14) }}
                  i18nKey={'Đăng xuất'}
                />
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </ViewBackground>
  );
};

export default AccountScreen;
