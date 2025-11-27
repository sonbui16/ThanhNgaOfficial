import { Text, View, ActivityIndicator, ScrollView } from 'react-native';
import React, { Component } from 'react';
import SafeAreaViews from 'components/SafeAreaView';
import colors from 'variables/colors';

import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';

@connect(state => ({
  token: state.auth?.listSite?.access_token,
}))
export class TestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      progress: 0,
    };
  }
  renderLoading = () => {
    return (
      <ActivityIndicator
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        size="small"
        color={colors.blue3}
      />
    );
  };
  render() {
    const { data, datalUser } = this.props.route.params;
    const { dataSchool } = this.props;
    const domain = 'thanhngaofficial';
    console.log(
      'domain',
      `https://${domain}.edubit.vn/quiz/${data.quiz_test_id[0]}?lid=${data._id}&user_id=${datalUser._id}`,
    );

    return (
      <SafeAreaViews style={{ backgroundColor: 'white' }}>
        {!this.state.isLoaded ? (
          <Progress.Bar
            borderWidth={0}
            borderRadius={0}
            color="orange"
            progress={this.state.progress}
            width={null}
            height={4}
          />
        ) : null}
        <WebView
          ref={ref => {
            this.webview = ref;
          }}
          onLoadProgress={({ nativeEvent }) =>
            this.setState({ progress: nativeEvent.progress })
          }
          startInLoadingState={true}
          allowFileAccessFromFileURLs={true}
          allowUniversalAccessFromFileURLs
          onError={syntheticEvent => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
          source={{
            uri: `https://${domain}.edubit.vn/quiz/${data.quiz_test_id[0]}?lid=${data._id}&user_id=${datalUser._id}`,
            headers: {
              'x-access-token': `${this.props.token}`,
            },
          }}
          onMessage={event => {
            console.log('Message from WebView: ', event.nativeEvent.data);
          }}
          onOpenWindow={syntheticEvent => {
            const { nativeEvent } = syntheticEvent;
            const { targetUrl } = nativeEvent;
            console.log('Intercepted OpenWindow for', targetUrl);
          }}
          scalesPageToFit={true}
          onLoadEnd={() => this.setState({ isLoaded: true })}
          renderLoading={this.renderLoading}
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
          }}
          injectedJavaScript={`
          // Thêm viewport meta tag nếu trang web chưa có
          if (!document.querySelector('meta[name="viewport"]')) {
            var meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
            document.getElementsByTagName('head')[0].appendChild(meta);
          }
          
          // Đảm bảo body chiếm toàn bộ chiều cao
          document.body.style.margin = '0';
          document.body.style.padding = '0';
          document.body.style.width = '100%';
          document.body.style.height = '100%';
          document.documentElement.style.width = '100%';
          document.documentElement.style.height = '100%';
          
          // Gửi thông báo khi đã load xong
          window.ReactNativeWebView.postMessage('loaded');`}
        />
      </SafeAreaViews>
    );
  }
}

export default TestScreen;
