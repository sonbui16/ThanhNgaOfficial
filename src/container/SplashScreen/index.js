import React, { Component } from 'react';
import {
  Image,
  ActivityIndicator,
  View,
  Linking,
  Alert,
  Text,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import colors from 'colors/';
import vari from 'variables/platform';
import images from 'imagesApp';
import {
  login,
  saveLoggedUser,
  saveMemSite,
  removeLoggedUser,
  refreshToken,
  saveListSite,
} from 'store/actions/auth';
import { saveLogin, checkDevice } from 'store/actions/app';
import DeviceInfo from 'react-native-device-info';
import checkVersion from 'react-native-store-version';
import RouterService from 'container/Router/RouterService';
const APP_LINK_ANDROID = `market://details?id=com.edubit`;
const APP_LINK_IOS = `itms-apps://itunes.apple.com/us/app/id${1495012373}?mt=8`;
const version = DeviceInfo.getVersion();
import { scale } from 'react-native-size-scaling';
import ViewBackground from 'components/ViewBackground';

@connect(
  state => ({
    tokenSite: state.auth.listSite,
    auth: state.auth.listSite,
    loggedIn: state.auth.loggedIn,
    userPass: state.auth.saveLogin,
    checksite: state.auth.check_site,
  }),
  {
    login,
    saveLogin,
    saveMemSite,
    saveLoggedUser,
    checkDevice,
    removeLoggedUser,
    refreshToken,
    saveListSite,
  },
)
export class SplashScreen extends Component {
  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.loadApp();
    }, 600);
  }
  // init = async () => {
  //   try {
  //     const check = await checkVersion({
  //       version,
  //       iosStoreURL: `https://apps.apple.com/us/app/edubit/id1495012373`,
  //       androidStoreURL: `https://play.google.com/store/apps/details?id=com.edubit`,
  //       country: 'vn',
  //     });

  //     if (check.result === 'new') {
  //       if (Platform.OS === 'ios') {
  //         Alert.alert(
  //           'Thông báo',
  //           `Bạn đang sử dụng phiên bản ${version}. Vui lòng cập nhật phần mềm lên phiên bản mới nhất!`,
  //           [
  //             {
  //               text: 'OK',
  //               onPress: () => Linking.openURL(APP_LINK_IOS),
  //             },
  //           ],
  //           {cancelable: false},
  //         );
  //       } else {
  //         if (Platform.OS === 'android') {
  //           Alert.alert(
  //             'Thông báo',
  //             `Bạn đang sử dụng phiên bản ${version}. Vui lòng cập nhật phần mềm lên phiên bản mới nhất!`,
  //             [
  //               {
  //                 text: 'OK',
  //                 onPress: () => Linking.openURL(APP_LINK_ANDROID),
  //               },
  //             ],
  //             {cancelable: false},
  //           );
  //         }
  //       }
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  resetLogin = async () => {
    const { checkDevice, auth, refreshToken, checksite, tokenSite } =
      this.props;

    if (checksite) {
      refreshToken({ refresh_token: tokenSite?.refresh_token }, (err, data) => {
        if (err) {
          Alert.alert('Thông báo', 'Có lỗi xảy ra.Vui lòng đăng nhập lại!', [
            {
              text: 'Ok',
              onPress: () => {
                RouterService.reset('LoginScreen');
              },
            },
          ]);
        } else {
          this.props.saveListSite(data);
          RouterService.reset('TabNavigation');
        }
      });
    } else {
      RouterService.reset('LoginScreen');
    }
  };
  loadApp = () => {
    if (this.props.loggedIn) {
      this.resetLogin();
      return;
    } else {
      RouterService.reset('TabNavigation');
    }
  };
  render() {
    return (
      <ViewBackground
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <Image
          source={images.logo}
          style={{
            height: vari.width / 2,
            width: vari.width / 2,
            marginTop: scale(40),
          }}
          resizeMode="contain"
        />
        <Text
          style={{ fontSize: scale(16), color: colors.blue3 }}
          onPress={() => this.props.removeLoggedUser()}
        >
          Thay đổi cách bạn yêu
        </Text>
        <ActivityIndicator style={{ marginTop: 15 }} color="white" />
      </ViewBackground>
    );
  }
}

export default SplashScreen;
