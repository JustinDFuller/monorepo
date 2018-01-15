import {
  StyleSheet,
} from 'react-native';
import constants from './../constants/styles';

export default StyleSheet.create({
  settingsContainer: {
    flex: 1,
    paddingTop: 20,
  },
  settingsHeader: {
    fontWeight: constants.bold,
    color: constants.black,
    fontFamily: constants.sanSerif,
    fontSize: constants.fontSizeTitle,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: constants.fontSizeReading,
    color: constants.black,
  },
});
