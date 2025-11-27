import React, {Component, useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import FloatingLabelInput from 'components/FloatingLabelInput';
import {scale} from 'react-native-size-scaling';
import Toolbar from 'components/Toolbar';

import AuthButton from 'components/AuthButton';
import images from 'imagesApp';
import vari from 'variables/platform';
import {updateProfile} from 'store/actions/app';
import {isRequestPending} from 'selectors/common';
import colors from 'colors';

const ChangePass = ({navigation}) => {
  const [setPassOld, passOld] = useState('');
  const [setPassNew, passNew] = useState('');
  const [setConfirmPass, confirmPass] = useState('');

  const showAlert = message => {
    Alert.alert('Thông báo', `${message}`, [{text: 'Đồng ý'}], {
      cancelable: false,
    });
  };

  const validateFied = (passOld, passNew, confirmPass) => {
    if (passOld === '' && passNew === '' && confirmPass === '') {
      showAlert(`Vui lòng điền đầy đủ thông tin`);
      return false;
    }
    if (passOld === '' || passNew === '' || confirmPass === '') {
      showAlert(`Vui lòng điền đầy đủ thông tin`);
      return false;
    }

    if (passNew.length < 6) {
      showAlert(`Mật khẩu phải tối thiểu 6 kí tự`);
      return false;
    }
    if (passNew !== confirmPass) {
      showAlert('Xác nhận mật khẩu không khớp');
      return false;
    }
    return true;
  };
  const goChangePass = values => {
    // const infoInput = {};
  };
  {
    return (
      <SafeAreaView
        style={{
          backgroundColor: 'white',
          flex: 1,
        }}>
        <Toolbar
          title="Thay đổi mật khẩu"
          leftPress={() =>navigation.goBack()}
          iconLeft={images.iconBack}
        />

        <View
          style={{
            flex: 1,
            paddingHorizontal: scale(20),
            justifyContent: 'space-between',
          }}>
          <View style={{marginTop: scale(20)}}>
            <FloatingLabelInput
              secureTextEntry={true}
              returnKeyType="done"
              maxLength={25}
              label="Nhập mật khẩu cũ "
              value={passOld}
              // onChangeText={value => this.setState({passOld: value})}
            />
            <View style={{marginVertical: scale(20)}}>
              <FloatingLabelInput
                secureTextEntry={true}
                returnKeyType="done"
                maxLength={25}
                label="Nhập mật khẩu mới "
                value={passNew}
                // onChangeText={value => this.setState({passNew: value})}
              />
            </View>

            <FloatingLabelInput
              secureTextEntry={true}
              returnKeyType="done"
              maxLength={25}
              label="Nhập lại mật khẩu "
              value={confirmPass}
              // onChangeText={value => this.setState({confirmPass: value})}
            />
          </View>
          <AuthButton
            // loading={loading}
            onPress={() =>
              goChangePass({
                passOld: passOld,
                passNew: passNew,
                confirmPass: confirmPass,
              })
            }
            text="THAY ĐỔI MẬT KHẨU"
          />
        </View>
      </SafeAreaView>
    );
  }
};

export default ChangePass;
