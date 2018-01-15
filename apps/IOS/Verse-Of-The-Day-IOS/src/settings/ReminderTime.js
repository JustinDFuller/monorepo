import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  DatePickerIOS,
} from 'react-native';
import {
  stateProps,
  statePropDefaults,
} from './../state';
import styles from './settings.styles';
import AppModal from './../AppModal';

const ReminderTime = ({ state, onUpdate }) => (
  <AppModal onPress={() => onUpdate('selectedSetting')('')}>
    <Text style={styles.settingLabel}>Choose Reminder Time:</Text>
    <DatePickerIOS
      date={state.notifications.date}
      mode="time"
      onDateChange={date => onUpdate('notifications')(Object.assign(state.notifications, { date }))}
    />
  </AppModal>
);

ReminderTime.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  state: stateProps,
};

ReminderTime.defaultProps = statePropDefaults;

export default ReminderTime;
