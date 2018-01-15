import {
  StyleSheet,
} from 'react-native';
import constants from './../constants/styles';

export default StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: constants.white,
    justifyContent: 'center',
    borderColor: 'rgba(0,0,0,.09)',
    borderWidth: 1,
    borderStyle: 'solid',
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 18,
  },
});
