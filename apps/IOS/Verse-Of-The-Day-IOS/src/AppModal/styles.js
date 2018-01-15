import {
  StyleSheet,
} from 'react-native';
import constants from './../constants/styles';

export default StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: constants.white,
    paddingTop: 5,
  },
  modalContainer: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  divider: {
    borderBottomColor: constants.gray,
    borderBottomWidth: 1,
  },
  backIcon: {
    height: 20,
    marginLeft: 10,
    marginTop: 15,
  },
});
