import React, {Component} from 'react';
import {TouchableOpacity, Image , Text, View } from 'react-native';
import {scale} from 'react-native-size-scaling';

import colors from 'colors';
import config from '../../constants/config';
export class DiscussItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
    };
  }
  onOpenChild = () => {
    this.setState({isCollapsed: !this.state.isCollapsed});
  };
  render() {
    const {data} = this.props;
    const {isCollapsed} = this.state;
    return (
      <TouchableOpacity
        onPress={this.onOpenChild}
        style={{
          padding: scale(10),
          borderBottomWidth: 1,
          borderBottomColor: colors.grey1,
        }}>
        <View style = {{flexDirection :'row'}}>
          <Image
            resizeMode={'contain'}
            source ={{uri: `${config.endPointImgUser}${data && data.user[0] && data.user[0].photo}`}}
            style={{
              height: scale(50),
              width: scale(50),
              borderRadius: scale(25),
            }}
          />
          <View style={{paddingHorizontal: scale(10), width: '85%'}}>
            <View  style={{justifyContent: 'space-between', flexDirection :'row'}}>
              <Text style = {{fontSize : scale(14)}}>{data.content}</Text>
            </View>
          </View>
        </View>
        <Text
          
          style={{
            fontSize : scale(12),
            marginTop: scale(5),
          }}>{`Trả lời(${data.replies.length})`}</Text>
     
      </TouchableOpacity>
    );
  }
}

export default DiscussItem;
