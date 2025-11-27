import React, { useEffect, useState, useRef } from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { WebView } from 'react-native-webview';
import RNFetchBlob from 'react-native-blob-util';
import Share from 'react-native-share';
import { scale } from 'react-native-size-scaling';
import Video, { VideoRef } from 'react-native-video';
import Toast from 'react-native-toast-message';

import { PLAYER_STATES } from 'container/LearnScreen/DetailLearnScreen/VideoDetail/playStates';
import { getPlayerStateIcon } from 'container/LearnScreen/DetailLearnScreen/VideoDetail/utiles';
import vari from 'variables/platform';
import { humanizeVideoDuration } from 'components/MediaControl/utiles';
import { Slider, Icon } from '@rneui/themed';
import DownloadButton from 'components/DownloadButton';
import images from 'imagesApp';

const RenderDocument = ({ navigation, route }) => {
  const [loading, setLoading] = useState({ download: false, webview: true });
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [isMute, setIsMute] = useState(false);
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(false);
  const { link_document } = route.params;
  const { size, type, ext } = route.params.document_info;

  const url = link_document;

  const fileName = url.split('/').pop();

  const viewerLink = getViewerUrl(url);

  const filePath = `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}`;
  const icon = getPlayerStateIcon(playerState);

  function getViewerUrl(originalUrl) {
    try {
      const matches = originalUrl.match(/^https?:\/\/([^\/]+)\//);
      if (!matches || matches.length < 2) return null;

      const host = matches[1]; // Ví dụ: file.edubit.vn
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

  const getMimeType = ext =>
    ({
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      xls: 'application/vnd.ms-excel',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ppt: 'application/vnd.ms-powerpoint',
      pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      txt: 'text/plain',
      jpg: 'image/jpeg',
      png: 'image/png',
    }[ext.toLowerCase()] || 'application/octet-stream');

  const requestPermission = async () => {
    if (Platform.OS === 'android' && parseInt(Platform.Version, 10) <= 28) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Cấp quyền lưu trữ',
          message: 'Ứng dụng cần quyền để lưu và mở file',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const downloadAndOpenFile = async () => {
    if (Platform.OS === 'android') {
      const hasPermission = await requestPermission();
      if (!hasPermission) return Alert.alert('Không có quyền truy cập bộ nhớ');

      try {
        const exists = await RNFetchBlob.fs.exists(filePath);
        if (!exists) {
          setLoading(l => ({ ...l, download: true }));
          await RNFetchBlob.config({
            fileCache: true,
            addAndroidDownloads: {
              useDownloadManager: true,
              title: fileName,
              description: 'Đang tải file...',
              mime: getMimeType(fileName.split('.').pop()),
              mediaScannable: true,
              notification: true,
              path: filePath,
            },
          }).fetch('GET', url);

          Toast.show({
            text1: 'Hoàn tất',
            text2: 'Tài liệu đang được tải về trong máy !',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Thông báo',
            text2: 'Tài liệu đã tồn tại trong máy !',
          });
        }
      } catch (error) {
        Alert.alert('Lỗi', 'Không thể tải hoặc mở file');
      } finally {
      }
    } else {
      try {
        const hasPermission = await requestPermission();
        if (!hasPermission) {
          Alert.alert('Không có quyền truy cập bộ nhớ');
          return;
        }
        const fileName = url.split('/').pop();
        const filePath = `${RNFetchBlob.fs.dirs.DocumentDir}/${fileName}`;
        const exists = await RNFetchBlob.fs.exists(filePath);
        setLoading(l => ({ ...l, download: true }));
        const res = await RNFetchBlob.config({
          fileCache: true,

          path: filePath,
        }).fetch('GET', url);
        const finalPath = res.path();
        setTimeout(async () => {
          const confirmedExist = await RNFetchBlob.fs.exists(finalPath);
          if (!confirmedExist) {
            Alert.alert(
              'Lỗi',
              `File không tồn tại tại đường dẫn: ${finalPath}`,
            );
            return;
          }

          await Share.open({
            url: finalPath,
            type: getMimeType(ext),
            failOnCancel: false,
            saveToFiles: true, // iOS only
          });

          Toast.show({
            type: 'success',
            text1: 'Thành công',
            text2: 'Tài liệu đã được lưu vào mục File !',
          });
        }, 500);
      } catch (error) {
        Alert.alert('Lỗi', 'Không thể tải hoặc mở file');
      } finally {
        setLoading(l => ({ ...l, download: false }));
      }
    }
  };

  const onReplay = () => {
    videoRef.current.seek(0);
    setPaused(false);
    setPlayerState(PLAYER_STATES.PLAYING);
  };
  const onPaused = playerState => {
    setPaused(!paused);
    setPlayerState(playerState);
  };
  const onPause = () => {
    const { PLAYING, PAUSED } = PLAYER_STATES;
    const newPlayerState = playerState === PLAYING ? PAUSED : PLAYING;
    return onPaused(newPlayerState);
  };
  const onProgress = data => {
    if (playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };
  const onEnd = () => {
    setPlayerState(PLAYER_STATES.ENDED);
    setPaused(true);
  };
  const onLoad = data => {
    setDuration(data.duration);
  };
  const onSeek = seek => {
    videoRef.current.seek(seek);
  };

  const pressAction = playerState === PLAYER_STATES.ENDED ? onReplay : onPause;
  const renderContent = () => {
    switch (type) {
      case 'audio':
        return (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'black',
              paddingHorizontal: scale(10),
            }}
          >
            <Video
              ref={videoRef}
              style={{
                width: '100%',
                height: 50,
              }}
              muted={isMute}
              source={{
                uri: link_document,
                headers: {
                  'X-Stream-Origin': 'app-thanhnga',
                },
              }}
              onProgress={onProgress}
              onEnd={onEnd}
              onLoad={onLoad}
              paused={paused}
            />
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
                height: scale(60),
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flexDirection: 'row',
                borderRadius: scale(30),
              }}
            >
              <TouchableOpacity
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: scale(20),
                }}
                onPress={pressAction}
              >
                <Image
                  source={icon}
                  style={{
                    height: scale(15),
                    resizeMode: 'contain',
                    width: scale(15),
                    tintColor: 'black',
                  }}
                />
              </TouchableOpacity>
              <Text style={{ color: 'black', fontSize: scale(12) }}>
                {humanizeVideoDuration(currentTime)} /
                {humanizeVideoDuration(duration)}
              </Text>
              <View style={{ width: vari.width / 3 }}>
                <Slider
                  style={{}}
                  trackStyle={{ borderRadius: 1, height: 2 }}
                  thumbStyle={{
                    backgroundColor: 'red',
                    borderRadius: 30,
                    height: 15,
                    width: 15,
                  }}
                  minimumTrackTintColor={'red'}
                  maximumTrackTintColor="#ccc"
                  maximumValue={Math.floor(duration)}
                  onSlidingComplete={value => onSeek(value)}
                  thumbTintColor="#0c0"
                  value={Math.floor(currentTime)}
                  thumbTouchSize={{ width: 40, height: 40 }}
                />
              </View>
              <Icon
                onPress={() => {
                  setIsMute(!isMute);
                }}
                color={'black'}
                name={isMute ? 'volume-off' : 'volume-high'}
                size={scale(15)}
                type="material-community"
              />
            </View>
          </View>
        );
      case 'image':
      case 'scrom':
        return (
          <View style={{ flex: 1 }}>
            <WebView
              source={{ uri: link_document }}
              onLoadStart={() => setLoading(l => ({ ...l, webview: true }))}
              onLoadEnd={() => setLoading(l => ({ ...l, webview: false }))}
              style={{ flex: 1 }}
            />
          </View>
        );
      case '': // File rar or zip
        return (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Image
                source={images.rar}
                resizeMode="contain"
                style={{
                  height: 100,
                  width: 100,
                }}
              />
              <Text style={{ color: 'grey', marginTop: 20 }}>{fileName}</Text>
            </View>

            <DownloadButton
              onPress={downloadAndOpenFile}
              loading={loading.download}
            />
          </View>
        );
      default:
        return (
          <View style={{ flex: 1 }}>
            {Platform.OS === 'android' ? (
              <WebView
                source={{
                  uri: viewerLink,
                }}
                style={{ flex: 1 }}
              />
            ) : (
              // <DocumentView
              //   document={encodeURI(url)}
              //   readOnly={true}
              //   downloadDialogEnabled={false}
              //   bottomToolbarEnabled={false}
              //   showLeadingNavButton={true}
              //   setVisibilityForAnnotation={false}
              //   padStatusBar={true}
              //   hideTopToolbars={true}
              // />
              <View></View>
            )}
            <View
              style={{
                position: 'absolute',
                bottom: 20,
                right: 20,
                padding: 10,
                zIndex: 10,
              }}
            >
              <DownloadButton
                onPress={downloadAndOpenFile}
                loading={loading.download}
              />
            </View>
          </View>
        );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>{renderContent()}</View>
  );
};

export default RenderDocument;
