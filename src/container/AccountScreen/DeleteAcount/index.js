import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { scale } from 'react-native-size-scaling';
import { Button } from '@rneui/themed';

import SafeAreaViews from 'components/SafeAreaView';
import images from 'imagesApp';
import vari from 'variables/platform';
import { deleteAcount } from 'actions/app';
import { removeLoggedUser } from 'actions/auth';
import Apptext from 'src/components/Apptext';
import { isRequestPending } from 'src/store/selectors';
import colors from 'variables/colors';

const DeleteAcount = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const loading = useSelector(state => isRequestPending(state, 'deleteAcount'));
  const deleteUser = () => {
    Alert.alert('Thông báo', 'Bạn có chắc muốn xóa tài khoản không ?', [
      {
        text: 'Hủy',
      },
      {
        text: 'Ok',
        onPress: () => {
          deleteAcount(user.access_token, (err, data) => {
            if (err) {
              alert(data.data.message);
            }
            if (data && data.data) {
              dispatch(removeLoggedUser());
              navigation.navigate('SplashScreen');
            }
          });
        },
      },
    ]);
  };

  return (
    <SafeAreaViews style={{ backgroundColor: 'white' }}>
      <ScrollView>
        <View>
          <Image
            source={images.deleteAcount}
            resizeMode="contain"
            style={{ width: '100%', height: vari.height / 4 }}
          ></Image>
        </View>

        <View style={{ padding: 10 }}>
          <Apptext
            style={{
              color: colors.blue3,
            }}
            i18nKey={
              'Lưu ý : Tài khoản sau khi xoá sẽ không thể phục hồi lại được'
            }
          />
          <Apptext
            style={{
              color: colors.blue3,
            }}
            i18nKey={
              'Bạn sẽ mất tất cả thông tin bao gồm tất cả các khoá học.Sau khi xoá tài khoản bạn sẽ không thể dùng lại email và số điện thoại của tài khoản này để tạo tài khoản mới'
            }
          />

          <Button
            color="error"
            onPress={() => navigation.goBack()}
            buttonStyle={{
              marginVertical: scale(10),
            }}
          >
            <Apptext i18nKey={'Huỷ'} style={{ color: 'white' }} />
          </Button>

          <Button
            type="outline"
            color="error"
            onPress={() => deleteUser()}
            buttonStyle={{
              borderColor: 'grey',
            }}
          >
            {' '}
            {loading ? (
              <>
                <ActivityIndicator></ActivityIndicator>
              </>
            ) : (
              <>
                <Apptext i18nKey={'Xoá tài khoản'} style={{ color: 'grey' }} />
              </>
            )}
            {/* <Apptext i18nKey={'deleteAccount'} style={{color: 'grey'}} /> */}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaViews>
  );
};

export default DeleteAcount;
