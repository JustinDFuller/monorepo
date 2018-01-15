import React from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import GestureRecognizer from './../GestureRecognizer';
import backIcon from './../img/back.png';
import styles from './styles';
import PropTypes from 'prop-types';

const AppModal = ({ onPress, children }) => (
  <Modal
    visible
    animationType={'slide'}
    transparent={false}
    supportedOrientations={['portrait']}
  >
    <GestureRecognizer
      onSwipeRight={onPress}
      style={styles.modalView}
    >
      <TouchableOpacity
        onPress={onPress}
      >
        <View style={{ padding: 10 }}>
          <Image
            style={styles.backIcon}
            resizeMode="contain"
            source={backIcon}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.divider} />
      <View style={styles.modalContainer}>
        { children }
      </View>
    </GestureRecognizer>
  </Modal>
);

AppModal.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default AppModal;
