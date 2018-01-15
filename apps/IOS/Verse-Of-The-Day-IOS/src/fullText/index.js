import React from 'react';
import {
  Text,
  WebView,
} from 'react-native';
import {
  VersesType,
} from './../state';
import AppModal from './../AppModal';
import styles from './fullText.styles';
import css from './inlineCSS';
import PropTypes from 'prop-types';

function highlightText(fullText, text) {
  return fullText.replace(text, `<span class='highlighted'>${text}</span>`);
}

const FullText = ({ back, readFullText }) => (
  <AppModal onPress={back}>
    <Text style={styles.fullTextHeader}>
      {readFullText.reference}
    </Text>
    <WebView
      source={{ html: highlightText(readFullText.fullText, readFullText.text) + css }}
      style={styles.webView}
    />
  </AppModal>
);

FullText.propTypes = {
  back: PropTypes.func.isRequired,
  readFullText: VersesType.isRequired,
};

export default FullText;
