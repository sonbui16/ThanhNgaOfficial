import React, {Component, useEffect, useState, useRef} from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Alert} from 'react-native';
import {OtpInput} from 'react-native-otp-entry';
import {useDispatch, useSelector} from 'react-redux';
import {scale} from 'react-native-size-scaling';

import {isRequestPending} from 'selectors/common';
import {verifyMFA} from 'store/actions/auth';
import AuthButton from 'components/AuthButton';
import colors from 'colors/';
import _ from 'lodash';

const TwoFactor = ({navigation, route}) => {
  console.log('sonbh42', route.params);
  const otpRef = useRef(null);
  const [method, setMethod] = useState('email');
  const [otp, setOtp] = useState('');
  const {email, token, dataMethod, handleProceedLogin} = route.params || {};

  const loading = useSelector(state => isRequestPending(state, 'verifyMFA'));

  const dispatch = useDispatch();
  const handleVerifyMFA = () => {
    dispatch(
      verifyMFA(
        {
          code: otp,
          type: method,
        },
        token,
        (err, data) => {
          if (data) {
            handleProceedLogin?.();
          } else {
            Alert.alert(
              'Thông báo',
              'Mã xác thực không đúng, vui lòng thử lại!',
            );
          }
        },
      ),
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: scale(20),
      }}>
      <Text style={styles.title}>
        {method === 'email'
          ? 'Nhập mã xác minh qua Email'
          : 'Nhập mã xác minh qua Authenticator'}
      </Text>
      <Text
        style={{
          fontSize: scale(14),
          color: 'black',
        }}>
        {method === 'email'
          ? `Nhập mã xác minh được gửi qua Email tới ${email}`
          : 'Nhập mã xác minh được gửi qua Authenticator'}
      </Text>

      <OtpInput
        ref={otpRef}
        // ref={state.refOtp}
        numberOfDigits={6}
        autoFocus
        onTextChange={c => setOtp(c)}
        theme={{
          containerStyle: styles.otpContainer,
          focusedPinCodeContainerStyle: styles.underlineStyleHighLighted,
          pinCodeContainerStyle: styles.underlineStyleBase,
          focusStickStyle: styles.stickFocus,
          pinCodeTextStyle: {color: 'black'},
        }}
      />

      <AuthButton
        disabled={otp.length < 6}
        loading={loading}
        onPress={() => handleVerifyMFA()}
        text="XÁC MINH"
        containerStyle={{backgroundColor: colors.blue3}}
      />
      {/* {method === 'email' && (
        <Text
          style={{
            textAlign: 'center',
            fontSize: scale(14),
            color: 'black',
            marginTop: scale(20),
          }}>
          Bạn không nhận được mã?{' '}
          <Text style={{color: colors.blue3}} onPress={() => {}}>
            Gửi lại
          </Text>
        </Text>
      )} */}
      {dataMethod?.two_factor_enabled && (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: scale(20),
            }}>
            <View
              style={{width: '40%', height: 1, backgroundColor: 'grey'}}></View>
            <Text style={{color: 'black', fontSize: scale(14)}}>Hoặc</Text>
            <View
              style={{width: '40%', height: 1, backgroundColor: 'grey'}}></View>
          </View>
          <View
            style={{
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                otpRef.current?.clear();
                setOtp('');
                setMethod(method === 'email' ? 'authenticator' : 'email');
              }}
              style={{
                backgroundColor: '#f1f1f1',
                paddingVertical: scale(5),
                borderRadius: scale(5),
                paddingHorizontal: scale(15),
              }}>
              <Text style={{color: 'black'}}>
                {method === 'email'
                  ? 'Nhận mã qua ứng dụng Authenticator'
                  : 'Nhận mã qua Email'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};
export default TwoFactor;
const styles = StyleSheet.create({
  otpContainer: {
    marginTop: scale(20),
    marginBottom: scale(20),
  },

  underlineStyleHighLighted: {
    borderColor: colors.blue3,
  },

  underlineStyleBase: {
    width: scale(52),
    height: scale(52),
    borderWidth: 1.5,
    fontSize: scale(24),
    borderRadius: scale(10),
    backgroundColor: '#F7F9F8',
  },

  title: {
    fontSize: scale(24),
    fontWeight: 'bold',
    marginBottom: scale(20),
    color: 'black',
  },
  stickFocus: {
    backgroundColor: colors.blue3,
  },
});
