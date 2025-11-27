import React, {Component, useEffect, useState} from 'react';
import {FlatList, ActivityIndicator, View, Text , StyleSheet } from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import colors from 'colors/';
import {courseMe , courseMemberShip } from 'actions/app';
import {isRequestPending} from 'selectors/common';
import DiscussItem from '../DiscussItem';
import {scale} from 'react-native-size-scaling';
import vari from 'variables/platform';
import Toolbar from 'components/Toolbar';
import moment from 'moment';

const Membership = ({navigation}) => {
  
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth.listSite);
  const inforUser = useSelector(state => state.auth.infoUseMe);
  const infoSite = useSelector(state => state.auth.infoSite);

  const loading = useSelector(state => isRequestPending(state, 'courseMemberShip'));

  useEffect(() => {
    showList();
  }, []);
  const renderEmptyContainer = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          height: vari.height / 1.5,
          alignItems: 'center',
        }}>
        <Text
          style={{fontSize: scale(14), textAlign: 'center', color: 'black'}}>
          Bạn chưa có khoá học nào
        </Text>
      </View>
    );
  };
  const showList = () => {
    dispatch(
      courseMemberShip(1, auth.access_token, (error, res) => {
        if (error) {
          return;
        } else {
          // this.setState({data: res?.data});
          setData(res?.data);
        }
      }),
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <>
        <DiscussItem
          key={index}
          data={item}
          listData={data}
          navigation={navigation}
        />
      </>
    );
  };


  const foundObject =
    inforUser &&
    inforUser.memberships &&
    inforUser.memberships.find(
      item => item.sid === infoSite._id,
    );
  const timeToEnd = moment(foundObject?.end);
  const timeToStart = moment(foundObject?.start);

  return (
    <View style={{flex: 1}}>

      <View style={styles.toolbarContent}>
            <View style={styles.touch}>
              <Text
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: 'white',
                  fontSize: scale(15),
                }}
                numberOfLines={1}>
                Membership
              </Text>
            </View>

            <View
              style={{
                height: scale(50),
                width: '5%',
                justifyContent: 'center',
                alignItems: 'center',
              }}></View>

            <View style={styles.touch}>
              <Text
                style={{
                 
                  textAlign: 'center',
                  color: 'white',
                  fontSize: scale(15),
                }}
                numberOfLines={1}>
           
                Hết hạn:{timeToEnd.format('DD/MM/YYYY')}
              </Text>
            </View>
          </View>
      {!loading ? (
        <>
          <FlatList
            refreshing={loading}
            onRefresh={() => showList()}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            ListEmptyComponent={renderEmptyContainer()}></FlatList>
        </>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={colors.blue3} />
        </View>
      )}
    </View>
  );
};
export default Membership;
const styles = StyleSheet.create({
  toolbarContent: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor:colors.blue3
  },
  touch: {
    width: scale(150),
    height: scale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
});