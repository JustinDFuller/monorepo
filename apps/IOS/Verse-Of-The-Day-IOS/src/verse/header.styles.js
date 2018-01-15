import {
  StyleSheet,
} from 'react-native';

export default StyleSheet.create({
  icon: {
    backgroundColor: '#4adcba',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 9,
    paddingLeft: 9,
    borderRadius: 20,
    marginRight: 20,
    marginTop: 4,
  },
  iconText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 25,
  },
  verseInfo: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    color: 'rgba(0,0,0,.8)',
    fontWeight: 'bold',
    fontFamily: 'Helvetica Neue',
  },
});
