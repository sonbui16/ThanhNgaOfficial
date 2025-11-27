import React from 'react';
import {
  Modal,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const LoadingModal = ({ visible }) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={true}
      onRequestClose={() => {}}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <ActivityIndicator size="small" color="#000" />
          <Text style={styles.text}>Loading...</Text>
        </View>
      </View>
    </Modal>
  );
};

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

export default LoadingModal;
