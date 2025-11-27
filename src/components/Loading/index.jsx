import React from 'react';
import {Modal, View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {useLoading} from '../../features/loading/hook';
import Spinner from 'react-native-loading-spinner-overlay';
function Loading() {
  const loading = useLoading();
  console.log('loading', loading);

  if (!loading) return null;
  return (
    <Modal transparent animationType="fade" visible={true}>
      <View style={styles.overlay}>
          <ActivityIndicator size="small" color="#000" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 14,
    color: 'black',
  },
});
export default Loading;
