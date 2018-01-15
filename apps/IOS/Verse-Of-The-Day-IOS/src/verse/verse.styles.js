import {
  StyleSheet,
} from 'react-native';
import styles from './../constants/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: styles.white,
    paddingRight: 30,
    paddingLeft: 30,
    paddingBottom: 5,
    paddingTop: 20,
    borderColor: 'rgba(0,0,0,.09)',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  content: {
    fontSize: 20,
    textAlign: 'left',
    color: styles.black,
    marginBottom: 5,
    fontFamily: 'HelveticaNeue',
  },
});
