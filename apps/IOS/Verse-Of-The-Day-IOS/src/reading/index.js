import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import {
  stateProps,
  statePropDefaults,
} from './../state';
import styles from './reading.styles';
import Verses from './verses';

const Reading = ({ onUpdate, state }) => (
  <View style={styles.container}>
    <Verses
      state={state}
      onUpdate={onUpdate}
    />
  </View>
);

export default Reading;

Reading.propTypes = {
  state: stateProps,
  onUpdate: PropTypes.func.isRequired,
};

Reading.defaultProps = statePropDefaults;
