import {
  View,
  ScrollView,
  Alert,
  Linking,
  useWindowDimensions,
  Text,
} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';
import HTMLView from 'react-native-render-html';
import {scale} from 'react-native-size-scaling';
import TableRenderer, {tableModel} from '@native-html/table-plugin';
import {HTMLContentModel, HTMLElementModel} from 'react-native-render-html';
import {SafeAreaView} from 'react-native-safe-area-context';
import {iframeModel} from '@native-html/iframe-plugin';
import {useFetchCompleteLesson} from '../../../services/course/hook';

import AudioPlayWebview from 'components/AudioPlayWebview';
import YoutubePlayer from 'react-native-youtube-iframe';

export const ContentHTML = ({data}) => {
  const {width} = useWindowDimensions();

  const htmlProps = {
    WebView,
    renderers: {
      table: TableRenderer,
    },
    renderersProps: {
      table: {
        displayMode: 'expand',
      },
    },
    customHTMLElementModels: {
      table: tableModel,
    },
  };
  const customHTMLElementModels = {
    audio: HTMLElementModel.fromCustomModel({
      tagName: 'audio',
      mixedUAStyles: {
        marginVertical: 10,
        backgroundColor: 'red',
      },
      contentModel: HTMLContentModel.block,
    }),
    iframe: iframeModel,
  };
  const renderers = {
    audio: AudioPlayWebview,
    iframe: ({tnode}) => {
      const src = tnode.attributes.src || '';
      const match = src.match(/embed\/([a-zA-Z0-9_-]{11})/);
      const videoId = match?.[1];
      if (videoId) {
        return (
          <View
            style={{
              aspectRatio: 16 / 9,
              backgroundColor: 'black',
            }}>
            <YoutubePlayer
              height={'100%'}
              play={false}
              webViewProps={{
                cacheMode: 'LOAD_NO_CACHE',
                incognito: true,
                allowsInlineMediaPlayback: true,
                mediaPlaybackRequiresUserAction: false,
              }}
              videoId={videoId}
            />
          </View>
        );
      }
      return (
        <WebView
          source={{uri: src}}
          style={{height: 220}}
          allowsFullscreenVideo
          javaScriptEnabled
          domStorageEnabled
        />
      );
    },
  };
  return (
    <View style={{flex: 1}}>
      <HTMLView
        contentWidth={width - scale(30)}
        tagsStyles={{
          body: {color: 'black', fontSize: scale(14)},
        }}
        source={{html: data?.text_content}}
        {...htmlProps}
        onLinkPress={(event, href) => {
          Linking.openURL(href);
        }}
        ignoredStyles={['font-family']}
        customHTMLElementModels={customHTMLElementModels}
        renderers={renderers}
        WebView={WebView}
      />
    </View>
  );
};

const TextContent = props => {
  const {data} = props.route.params;
  {
    !data.complete && useFetchCompleteLesson(data._id);
  }

  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right']}
      style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView contentContainerStyle={{}}>
        <ContentHTML data={data} />
      </ScrollView>
    </SafeAreaView>
  );
};
export default TextContent;
