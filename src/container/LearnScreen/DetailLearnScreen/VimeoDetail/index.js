import {Text, View} from 'react-native';
import React, {Component} from 'react';
import {Vimeo} from 'react-native-vimeo-iframe';

import vari from 'variables/platform';
import {Watermark} from 'src/components/Watermark';

export class VimeoDetail extends Component {
  completeCourse = () => {
    const {onPressComplete} = this.props;
    onPressComplete && onPressComplete();
  };
  render() {
    const {item} = this.props;
    return (
      <View style={{height: 190, width: vari.width}}>
        <Vimeo
          videoId={item?.video_id}
          params={`h=${item?.hash}&controls=1&playsinline=0&autoplay=1&loop=1`}
          handlers={{
            ended: () => {
              this.completeCourse(item);
            },
          }}
        />
        <Watermark text={this.props.msg} />
      </View>
    );
  }
}
export default VimeoDetail;