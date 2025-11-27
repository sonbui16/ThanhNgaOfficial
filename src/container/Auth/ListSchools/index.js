import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from 'react-native';
import {Surface} from 'react-native-paper';
import React, {Component, useEffect, useState} from 'react';
import Toolbar from 'src/components/Toolbar';
import {Image} from 'react-native';
import {scale} from 'react-native-size-scaling';
import vari from 'variables/platform';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  getListSchool,
  sitesGetToken,
  saveListSite,
  saveSchool,
  saveListItem,
} from 'src/store/actions';
import images from 'src/assets/images';
import {isRequestPending} from 'src/store/selectors/common';
import colors from 'colors/';
import {Avatar} from 'react-native-paper';
import Apptext from 'src/components/Apptext';
import RouterService from 'container/Router/RouterService';
const ListSchools = ({navigation}) => {
  const [dataList, setDataList] = useState([]);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth.listSite);
  const idCurrent = useSelector(state => state.app.listItem);
  const loading = useSelector(state =>
    isRequestPending(state, 'getListSchool'),
  );
  useEffect(() => {
    showListSchool();
  }, [page]);
  const showListSchool = () => {
    dispatch(
      getListSchool(page, auth?.access_token, (err, data) => {
        if (err) {
        } else {
          let dataSc = [];
          data?.data.map(i => {
            if (i._id !== idCurrent && i._id !== '5f77e91d06ed3f21766be8c1') {
              dataSc.push(i);
            }

            setDataList(dataList.concat(dataSc));
          });
        }
      }),
    );
  };
  const handleLoadMore = () => {
    setPage(page + 1);
  };
  const handleCourse = i => {
    if (i?.end_date_remove_file && i.package.code === 'free') {
      Alert.alert('Thông báo', 'Hết hạn');
    } else {
      dispatch(
        sitesGetToken(i._id, auth.access_token, (err, data) => {
          if (err) {
            // Alert.alert('Thông báo', `${err.message?.message}`);
            err.customMessage = `${err.message?.message}`;
          } else {
            dispatch(saveSchool(i));
            dispatch(saveListSite(data));
            dispatch(saveListItem(i._id));
            RouterService.reset('SplashScreen');
          }
        }),
      );
    }
  };
  const renderItem = ({item, index}) => {
    return (
      <Surface
        key={index.toString()}
        style={{
          borderColor: 'grey',
          height: vari.width / 1.7,
          flex: 1,
          margin: scale(10),
          backgroundColor: 'white',
        }}
        elevation={2}>
        <TouchableOpacity
          onPress={() => handleCourse(item)}
          style={{
            height: vari.width / 1.7,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flex: 1,
          }}>
          <Avatar.Image
            size={vari.width / 5}
            style={{backgroundColor: 'white'}}
            source={item.logo ? {uri: item.logo} : images.noThumb}
          />
          <Text
            numberOfLines={1}
            style={{
              fontSize: scale(14),
              fontWeight: 'bold',
            }}>
            {item.name}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: scale(12),
              color: colors.blue3,
            }}>
            {item.domain ? item.domain : `${item.subdomain}.edubit.vn`}
          </Text>
        </TouchableOpacity>
      </Surface>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Toolbar
        title="list-schools"
        iconLeft={images.iconBack}
        leftPress={() => navigation.goBack()}
      />

      {dataList.length !== 0 ? (
        <FlatList
          data={dataList}
          refreshing={loading}
          onRefresh={() => showListSchool()}
          onEndReached={() => handleLoadMore()}
          numColumns={2}
          onEndReachedThreshold={1}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              padding: 10,
            }}>
            <Image
              source={images.deleteAcount}
              resizeMode="contain"
              style={{width: '100%', height: vari.height / 4}}></Image>
            <Apptext
              i18nKey="empty-school"
              style={{textAlign: 'center'}}></Apptext>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};
export default ListSchools;
