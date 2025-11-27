import React, {Component} from 'react';
import {TouchableOpacity, Alert , Text, View } from 'react-native';
import {scale} from 'react-native-size-scaling';

import colors from 'colors';
import vari from 'variables/platform';
export class Lessons extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isCheck: false,
      course_id: '',
    };
  }
  showAlert = message => {
    Alert.alert('Thông báo', `${message}`, [{text: 'Đồng ý'}], {
      cancelable: false,
    });
  };
  render() {
    const {data} = this.props;
    const {isCheck} = this.state;
    return (
      <View
        
        style={{
          height: isCheck ? null : vari.width + scale(50),
          borderRadius: scale(5),
          margin: scale(10),
          backgroundColor :'white'
        }}>
        <View
          style={{
            overflow: 'hidden',
            height: isCheck ? null : vari.width,
            borderRadius: scale(5),
          }}>
          {data &&
            data.map((lessons, index) => {
              return (
                <View key={index}>
                  <View
                    
                    style={{
                      overflow: 'hidden',
                      justifyContent: 'space-between',
                      backgroundColor: colors.blue3,
                      padding: scale(10),
                      
                    }}>
                    <Text
                      
                      style={{fontWeight: '700', width: '80%', colors : 'white' , fontSize : scale(16)}}>
                      {lessons?.name_chapter}
                    </Text>
                    <Text white size14 style={{fontWeight: '700'}}>
                      {data.length} bài
                    </Text>
                  </View>
                </View>
              );
            })}
        </View>
        <Text
          
          onPress={() => this.setState({isCheck: !isCheck})}
          style={{textAlign: 'center', padding: scale(10)}}>
          {isCheck ? 'THU GỌN' : 'XEM THÊM'}
        </Text>
      </View>
    );
  }
}

export default Lessons;
