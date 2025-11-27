import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Linking,
  Alert,
  Button,
  Image,
  Dimensions,
} from 'react-native';
import { Provider } from 'react-redux';
import Modal from 'react-native-modal';
import * as Progress from 'react-native-progress';
import { scale } from 'react-native-size-scaling';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RNPdftron } from '@pdftron/react-native-pdf';
import { checkVersion } from 'react-native-check-version';
import ErrorBoundary from 'react-native-error-boundary';

import colors from 'colors';
import store from './src/store';
import vari from 'variables/platform';
import Router from 'container/Router';
import LoadingModal from 'components/Loading';
import images from 'src/assets/images';

export default function App() {
  const [progress, setProgress] = useState({});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    RNPdftron.initialize('Insert commercial license key here after purchase');
    RNPdftron.enableJavaScript(true);

    (async () => {
      const version = await checkVersion();
      if (version.needsUpdate) {
        Alert.alert(
          'Cập nhật',
          'Có bản cập nhật mới. Vui lòng cập nhật để sử dụng ứng dụng',
          [{ text: 'Cập nhật', onPress: () => Linking.openURL(version?.url) }],
        );
      }
    })();
  }, []);

  const formatSizeUnits = bytes => {
    if (bytes >= 1073741824) return (bytes / 1073741824).toFixed(2) + ' GB';
    if (bytes >= 1048576) return (bytes / 1048576).toFixed(2) + ' MB';
    if (bytes >= 1024) return (bytes / 1024).toFixed(2) + ' KB';
    if (bytes > 1) return bytes + ' bytes';
    if (bytes === 1) return bytes + ' byte';
    return '0 bytes';
  };
  const ErrorFallback = ({ error, resetError }) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}
      >
        <Image
          resizeMode="contain"
          source={images.errorBoundary}
          style={{
            width: Dimensions.get('screen').width / 2,
            height: Dimensions.get('screen').width / 2,
          }}
        />
        <Text
          style={{
            fontSize: scale(18),
            color: 'black',
            fontWeight: '700',
            marginBottom: 10,
          }}
        >
          WOOP!
        </Text>
        <Text
          style={{
            fontSize: scale(14),
            color: 'black',
            fontWeight: '500',
            marginBottom: 10,
          }}
        >
          Đã có lỗi xảy ra 😢. Vui lòng thử lại sau.
        </Text>
        <Button title="Thử lại" onPress={resetError} />
      </View>
    );
  };
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SafeAreaProvider>
        <Provider store={store}>
          <LoadingModal />
          <PaperProvider>
            <Router />
            <Modal visible={visible} style={{ margin: 0 }}>
              <View style={styles.downloadWrap}>
                <View style={{ borderRadius: scale(10), padding: scale(25) }}>
                  <Text style={styles.downloadLabel}>
                    Đang tải bản cập nhập
                  </Text>
                  <Progress.Bar
                    color={colors.blue3}
                    style={styles.downloadShadow}
                    unfilledColor="#D9D9D9"
                    borderWidth={0}
                    borderRadius={scale(14)}
                    height={scale(10)}
                    progress={
                      (progress?.receivedBytes ?? 0) /
                        (progress?.totalBytes ?? 1) || 0
                    }
                    width={vari.width / 1.1}
                  />
                  {progress?.receivedBytes && progress?.totalBytes && (
                    <Text
                      style={{
                        color: 'white',
                        fontSize: scale(13),
                        marginVertical: scale(2),
                        fontWeight: '400',
                        textAlign: 'center',
                      }}
                    >
                      {`${formatSizeUnits(
                        progress?.receivedBytes,
                      )} of ${formatSizeUnits(progress?.totalBytes)}`}
                    </Text>
                  )}
                </View>
              </View>
            </Modal>
          </PaperProvider>
        </Provider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  downloadWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  downloadLabel: {
    color: 'white',
    fontSize: scale(14),
    marginVertical: scale(8),
    fontWeight: '400',
    textAlign: 'center',
  },
  downloadShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
