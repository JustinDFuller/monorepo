import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  PickerIOS,
  ActivityIndicator,
} from 'react-native';
import {
  stateProps,
  statePropDefaults,
} from './../state';
import styles from './settings.styles';
import AppModal from './../AppModal';

const PickerItemIOS = PickerIOS.Item;

const bibleVersion = ({ state, onUpdate }) => (
  <AppModal onPress={() => onUpdate('selectedSetting')('')}>
    <Text style={styles.settingLabel}>Choose Bible Version:</Text>
    {
        !state.bibleVersions.length &&
        <ActivityIndicator
          animating
          style={{ height: 80 }}
          size="large"
        />
      }
    <PickerIOS
      selectedValue={state.bibleVersion}
      onValueChange={v => onUpdate('bibleVersion')(v)}
    >
      {
          state.bibleVersions.length && state.bibleVersions.map(v => (
            <PickerItemIOS
              key={v.id}
              value={v.id}
              label={v.name}
            />
          ))
        }
    </PickerIOS>
  </AppModal>
  );

bibleVersion.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  state: stateProps,
};

bibleVersion.defaultProps = statePropDefaults;

export default bibleVersion;
