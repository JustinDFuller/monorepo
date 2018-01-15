import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Share,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import {
  VersesType,
} from './../state';
import styles from './shareBar.styles';
import shareIcon from './../img/share.png';

function share({ text, title }) {
  return Share.share({
    message: text,
    url: 'https://verse-of-the-day.herokuapp.com/',
    title,
  }, {
    dialogTitle: 'Share today\'s verse.',
    tintColor: 'green',
  })
  .catch(error => console.error(error));
}

const ShareBar = ({ onUpdate, verse }) => (
  <View style={styles.shareBar}>
    <TouchableOpacity
      onPress={() => share(verse)}
    >
      <View style={{ padding: 10 }}>
        <Image
          resizeMode="contain"
          style={{ height: 20, width: 20, marginRight: 25 }}
          source={shareIcon}
        />
      </View>
    </TouchableOpacity>
    {
      /*
      <TouchableOpacity
        onPress={this.like.bind(this)}>
        <Image
          resizeMode='contain'
          style={{ height: 20, width: 70 }}
          source={require('./../img/like.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={this.like.bind(this)}>
        <Image
          resizeMode='contain'
          style={{ height: 20, width: 70 }}
          source={require('./../img/liked.png')}
        />
      </TouchableOpacity>
      */
    }
    <TouchableOpacity
      onPress={() => onUpdate('readFullText')(verse)}
    >
      <View style={{ padding: 10 }}>
        <Text style={styles.button}>
          Read More
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

ShareBar.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  verse: VersesType.isRequired,
};

export default ShareBar;
