import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
} from 'react-native';
import styles from './header.styles';

const Header = ({ iconText, title, reference, bibleID }) => (
  <View style={styles.header}>
    <View style={styles.icon}>
      <Text style={styles.iconText}>
        { iconText}
      </Text>
    </View>
    <View>
      <Text>{ title }</Text>
      <View style={styles.verseInfo}>
        <Text style={styles.title}>
          { reference }
        </Text>
        <Text style={{ fontSize: 10, position: 'relative', bottom: 3, left: 5 }}>
          { bibleID.replace(/[^A-Z]/g, '') }
        </Text>
      </View>
    </View>
  </View>
);

Header.propTypes = {
  iconText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  reference: PropTypes.string.isRequired,
  bibleID: PropTypes.string,
};

Header.defaultProps = {
  bibleID: '',
};

export default Header;
