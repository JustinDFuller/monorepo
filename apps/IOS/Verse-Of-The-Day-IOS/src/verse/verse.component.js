import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {
  statePropDefaults,
  VersesType,
} from './../state';
import styles from './verse.styles';
import Header from './header.component';
import ShareBar from './../sharebar/shareBar.component';
import PlaceHolder from './../PlaceHolder';

function getIconText(text) {
  return text.replace(/[\W\d]/gi, '')
            .substring(0, 2)
            .toUpperCase();
}

const Verse = ({ verse, onUpdate }) => (
  <View style={styles.container}>
    <View style={styles.innerContainer}>
      <Header
        iconText={getIconText(verse.reference)}
        reference={verse.reference}
        theme={verse.theme}
        title={verse.title}
        bibleID={verse.bibleID}
      />
      {
        !verse.text &&
        <PlaceHolder />
      }
      {
        verse.text &&
        <View>
          <Text style={styles.content}>
            { verse.text }
          </Text>
          <ShareBar
            onUpdate={onUpdate}
            verse={verse}
          />
        </View>
      }
    </View>
  </View>
);

Verse.propTypes = {
  verse: VersesType.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

Verse.defaultProps = statePropDefaults;

export default Verse;
