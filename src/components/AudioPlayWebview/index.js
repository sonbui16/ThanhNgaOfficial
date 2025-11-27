import * as React from 'react';
import {StyleSheet, Platform} from 'react-native';
import WebView from 'react-native-webview';
import {scale} from 'react-native-size-scaling';
const AudioPlayWebview = ({tnode}) => {
  const audioSrc = tnode.attributes?.src;

  if (!audioSrc) {
    return null;
  }
  return (
    <WebView
      originWhitelist={['*']}
      // source={{ uri: `${audioSrc}` }}
      // source={{ html: `<audio controls="controls" style controlslist="nodownload" src="${audioSrc}">&nbsp;</audio>` }}
      source={
        Platform.OS === 'android'
          ? {
              html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body {
                  margin: 0;
                  background-color: black;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  height: 100vh;
                }
                audio {
                  width: 90%;
                  height: 60px;
                }
              </style>
            </head>
            <body>
              <audio controls controlslist="nodownload" src="${audioSrc}"></audio>
            </body>
          </html>
        `,
            }
          : {uri: `${audioSrc}`}
      }
      style={styles.body}
    />
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  body: {
    width: '100%',
    height: scale(50),
    marginVertical: scale(4),
  },
});
export default AudioPlayWebview;
