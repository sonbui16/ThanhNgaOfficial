import React from 'react';
import { Alert, View, Linking, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { Button } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { scale } from 'react-native-size-scaling';
import { DocumentView, RNPdftron } from '@pdftron/react-native-pdf';

import images from 'imagesApp';
import Toolbar from 'components/Toolbar';
import { lessonsID } from 'store/actions/app';

const DocumentInfo = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth.listSite);

  const { url, type, embed } = route.params.data.document_info;
  const viewerLink = getViewerUrl(url);
  const { complete } = route.params.data;
  function getViewerUrl(originalUrl) {
    try {
      const matches = originalUrl.match(/^https?:\/\/([^\/]+)\//);
      if (!matches || matches.length < 2) return null;
      const host = matches[1];
      return `https://${host}/embed/webviewer?url=${encodeURIComponent(
        originalUrl,
      )}`;
    } catch (e) {
      return (
        'https://file.edubit.vn/embed/webviewer?url=' +
        encodeURIComponent(originalUrl)
      );
    }
  }

  const completeCourse = () => {
    const { data } = route.params;
    dispatch(
      lessonsID(
        'patch',
        auth.access_token,
        data._id,
        { complete_status: 1 },
        (err, data) => {
          if (err) {
            Alert.alert('Thông báo', err?.message?.message);
            return;
          } else {
            Alert.alert(
              'Thông báo',
              `${data?.message}`,
              [
                {
                  text: 'OK',
                  onPress: () => {
                    navigation.goBack();
                  },
                },
              ],
              { cancelable: false },
            );
          }
        },
      ),
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {type === 'scorm' ? (
        <WebView
          source={{
            uri: embed,
          }}
          style={{ marginTop: 5 }}
        />
      ) : (
        <View style={{ flex: 1 }}>
          {Platform.OS === 'android' ? (
            <WebView
              source={{
                uri: viewerLink,
              }}
              style={{ flex: 1 }}
              originWhitelist={['*']}
              javaScriptEnabled
              domStorageEnabled
              useWebKit={true}
              allowsBackForwardNavigationGestures={true}
              bounces={false}
            />
          ) : (
            <DocumentView
              document={encodeURI(url)}
              readOnly={true}
              downloadDialogEnabled={false}
              bottomToolbarEnabled={false}
              showLeadingNavButton={true}
              setVisibilityForAnnotation={false}
              padStatusBar={true}
              hideTopToolbars={true}
            />
          )}

          {/* @Sonbh https://file.edubit.vn/embed/web-viewer/39624 nếu có ID
          https://file.edubit.vn/embed/webviewer?url= nếu có URL chỉ hỗ trợ file
          cùng domain hoặc file bật CORS * (tất cả) với các site có domain riêng
          khi gắn file có dạng https://file.custom-domain.com/storage/.... thì
          lấy luôn domain file đó gắn vào thành dạng
          https://file.custom-domain.com//embed/webviewer?url=https://file.custom-domain.com/storage/.... */}
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: scale(10),
          justifyContent: 'space-evenly',
        }}
      >
        {!complete && (
          <Button
            title={'Hoàn thành'}
            titleStyle={{ fontSize: scale(14), color: 'white' }}
            color="error"
            onPress={completeCourse}
          />
        )}
      </View>
    </View>
  );
};

export default DocumentInfo;
