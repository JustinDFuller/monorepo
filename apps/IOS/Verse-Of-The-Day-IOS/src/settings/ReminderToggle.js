import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Switch,
} from 'react-native';
import {
  stateProps,
  statePropDefaults,
} from './../state';

const ReminderToggle = ({ state, onUpdate }) => (
  <View
    style={{ marginTop: 20, marginBottom: 20, marginLeft: 20 }}
  >
    <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
      Turn { state.notifications.allowed ? 'off' : 'on' } notifications
    </Text>
    <Switch
      onValueChange={allowed => onUpdate('notifications')(Object.assign(state.notifications, { allowed }))}
      value={state.notifications.allowed}
    />
  </View>
);

ReminderToggle.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  state: stateProps,
};

ReminderToggle.defaultProps = statePropDefaults;

export default ReminderToggle;
