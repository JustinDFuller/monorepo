import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'react-native';
import {
  stateProps,
  statePropDefaults,
} from './../state';
import Button from './../button';
import styles from './settings.styles';
import BibleVersion from './bibleVersion';
import ReminderTime from './ReminderTime';
import ReminderToggle from './ReminderToggle';

const Settings = ({ state, onUpdate }) => (
  <View style={styles.settingsContainer}>
    <Text style={styles.settingsHeader}>Settings</Text>
    <Button text="Change Bible Version" onPress={() => onUpdate('selectedSetting')('bibleVersion')} />
    <ReminderToggle state={state} onUpdate={onUpdate} />
    <Button text="Set Reminder Time" onPress={() => onUpdate('selectedSetting')('reminderTime')} />
    {
      state.selectedSetting === 'bibleVersion' &&
      <BibleVersion state={state} onUpdate={onUpdate} />
    }
    {
      state.selectedSetting === 'reminderTime' &&
      <ReminderTime state={state} onUpdate={onUpdate} />
    }
  </View>
);

Settings.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  state: stateProps,
};

Settings.defaultProps = statePropDefaults;

export default Settings;
