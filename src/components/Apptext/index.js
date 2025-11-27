import {View, Text} from 'react-native';
import React, {Component} from 'react';
import {scale} from 'react-native-size-scaling';

export class Apptext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appLanguage: 'vi',
      value: '',
    };
  }

  render() {
    return (
      <View>
        <Text style={[{color: 'black', fontSize: scale(14)}, this.props.style]}>
          {this.props.i18nKey}
        </Text>
      </View>
    );
  }
}

export default Apptext;
