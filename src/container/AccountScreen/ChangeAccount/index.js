import React, { useEffect } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
// import RNFetchBlob from 'rn-fetch-blob';

const FileDownloadAndOpen = () => {
  // useEffect(() => {
  //   const fileUrl = 'https://file.edubit.vn/storage/ecea7b1e0362f9230cecbf41868835c9ff1ab1e4/mo-ta-tinh-nang-goi-pro.pdf';
  //   const fileName = fileUrl.split('/').pop(); // đổi thành file bạn muốn
  //   const mimeType = getMimeType(fileName);

  //   const startProcess = async () => {
  //     const hasPermission = await requestPermission();
  //     if (!hasPermission) {
  //       Alert.alert('Không có quyền truy cập bộ nhớ');
  //       return;
  //     }

  //     const { fs, android, config } = RNFetchBlob;
  //     const filePath = `${fs.dirs.DownloadDir}/${fileName}`;

  //     const exists = await fs.exists(filePath);
  //     if (exists) {
  //       android.actionViewIntent(filePath, mimeType);
  //     } else {
  //       config({
  //         addAndroidDownloads: {
  //           useDownloadManager: true,
  //           title: fileName,
  //           description: 'Đang tải file...',
  //           mime: mimeType,
  //           mediaScannable: true,
  //           notification: true,
  //           path: filePath,
  //         },
  //       })
  //         .fetch('GET', fileUrl)
  //         .then((res) => {
  //           android.actionViewIntent(res.path(), mimeType);
  //         })
  //         .catch((err) => {
  //           Alert.alert('Lỗi', 'Không thể tải hoặc mở file');
  //         });
  //     }
  //   };

  //   startProcess();
  // }, []);

  // 👉 Yêu cầu quyền lưu file (Android)
  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const sdkInt = parseInt(Platform.Version, 10);
      if (sdkInt <= 28) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Cấp quyền lưu trữ',
            message: 'Ứng dụng cần quyền để lưu và mở file',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    }
    return true;
  };

  // 👉 Tự động xác định MIME type theo định dạng
  const getMimeType = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    const types = {
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
    };
    return types[extension] || 'application/octet-stream';
  };

  return null; // hoặc loading indicator nếu muốn
};

export default FileDownloadAndOpen;


