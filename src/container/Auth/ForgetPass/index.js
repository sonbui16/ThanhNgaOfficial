import { Alert, View, Text, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { scale } from 'react-native-size-scaling';

import FloatingLabelInput from 'src/components/FloatingLabelInput';
import AuthButton from 'src/components/AuthButton';
import { changePass } from 'store/actions/auth';
import { isRequestPending } from 'src/store/selectors';
import colors from 'colors/';
import { site_id } from 'store/api/common';
import ViewBackground from 'components/ViewBackground';

const ForgetPass = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector(state => isRequestPending(state, 'changePass'));

  const goForgetPass = values => {
    const infoInput = {};
    infoInput.email = values.email;
    infoInput.site_id = site_id;
    dispatch(
      changePass(infoInput, (err, data) => {
        if (!err) {
          Alert.alert(
            'Thành công',
            'Chúng tôi đã gửi yêu cầu, vui lòng kiểm tra email của bạn !',
          );
        }
      }),
    );
  };

  return (
    <ViewBackground
      style={{
        flex: 1,
        paddingHorizontal: scale(20),
        justifyContent: 'center',
      }}
    >
      <View style={{ flex: 1 }}>
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
          label="Nhập email"
          value={email}
          onChangeText={value => setEmail(value)}
        />
        <AuthButton
          disabled={email === ''}
          loading={loading}
          onPress={() => goForgetPass({ email })}
          text="XÁC NHẬN"
          containerStyle={{ backgroundColor: colors.blue3 }}
        />
      </View>
    </ViewBackground>
  );
};
export default ForgetPass;
