import React from 'react';
import {
  TabBarIOS,
} from 'react-native';
import {
  stateProps,
  statePropDefaults,
} from './../state';
import settingsIcon from './../img/settings.png';
import readingIcon from './../img/reading.png';
import Reading from './../reading';
import Settings from './../settings';
import styles from './../constants/styles';
import PropTypes from 'prop-types';

const NavigationBar = ({
  state,
  onUpdate,
}) => (
  <TabBarIOS
    unselectedTintColor={styles.white}
    tintColor={styles.white}
    unselectedItemTintColor={styles.white}
    barTintColor={styles.black}
  >
    <TabBarIOS.Item
      title="Read"
      icon={readingIcon}
      selected={state.selectedTab === 'read'}
      onPress={() => onUpdate('selectedTab')('read')}
    >
      <Reading
        state={state}
        onUpdate={onUpdate}
      />
    </TabBarIOS.Item>
    <TabBarIOS.Item
      title="Settings"
      icon={settingsIcon}
      selected={state.selectedTab === 'settings'}
      onPress={() => onUpdate('selectedTab')('settings')}
    >
      <Settings
        state={state}
        onUpdate={onUpdate}
      />
    </TabBarIOS.Item>
  </TabBarIOS>
);

NavigationBar.propTypes = {
  state: stateProps,
  onUpdate: PropTypes.func.isRequired,
};

NavigationBar.defaultProps = statePropDefaults;

export default NavigationBar;
