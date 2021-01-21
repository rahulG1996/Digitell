import React from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';
import {AllColor} from '../../utils/allColors';

const Loader = (props) => {
  const {loading} = props;

  return (
    <Modal transparent animationType={'none'} visible={loading}>
      <View style={styles.modalBackground}>
        <ActivityIndicator
          animating={loading}
          color={AllColor.orange}
          size={50}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000010',
  },
});

export default Loader;
