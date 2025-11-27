import React, { Component } from 'react'
import { TouchableOpacity , Image ,TextInput , Text, View  } from 'react-native';
import {scale} from 'react-native-size-scaling';

import images from 'imagesApp';
import colors from 'colors';
import vari from 'variables/platform';

export class ItemInfor extends Component {
  render() {
    const { txtInput , title , touch , placeholder ,text , name , source , onPress } = this.props
    return (
      <View  style = {{flexDirection :'row', paddingHorizontal : scale(20),height : scale(60) ,borderBottomWidth:1 , borderBottomColor :'#EDEEF0' ,  justifyContent :'space-between' }}>
        <View style = {{justifyContent :'center' , flexDirection :'row' }}>
          <Text  style = {{fontWeight : '600' ,fontSize : scale(14), marginHorizontal : scale(10)}}>{name}</Text>
        </View>
        {/* <Text>da</Text> */}
        {txtInput && 
        <TextInput
          {...this.props}
          placeholderTextColor = {colors.blue3}
          selectionColor = {colors.blue3}
          placeholder ={placeholder}
          style = {{
            color : colors.blue3,
            fontSize : scale(14),
            textAlign :'right',
            height : scale(44) , 
            width : vari.width * 2/4 ,
            // backgroundColor :'red',
            
          }}
        />}
        {title && 
          <View style = {{height : scale(44) , alignItems :'flex-end' , justifyContent:'center' , width : vari.width * 2/4 , }}>
              <Text  style = {{fontSize : scale(14)}} numberOfLines = {1}>{title}</Text>
          </View>
        }
        {touch && <View style = {{justifyContent :'center' , alignItems :'flex-end', height : scale(44) , width : vari.width * 2/4 ,
        // backgroundColor : 'red'
        }}>
          <TouchableOpacity onPress = {onPress}>
            <Text style = {{fontSize : scale(12)}}>{text}</Text>
          </TouchableOpacity>
          </View>}
      </View>
    )
  }
}

export default ItemInfor
