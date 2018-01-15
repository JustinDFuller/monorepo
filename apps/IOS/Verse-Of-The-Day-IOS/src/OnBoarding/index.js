import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
} from 'react-native';
import Swiper from 'react-native-swiper';
import styles from './../constants/styles';
import NotificationIcon from './../img/mailbox.png';

const Screen = ({ children }) => (
  <View style={{ flex: 1, justifyContent: 'space-between' }}>
    <View style={{ backgroundColor: styles.secondary, paddingTop: 25, paddingBottom: 10, alignItems: 'center', justifyContent: 'flex-end' }}>
      <Text style={{ color: styles.white, fontWeight: 'bold' }}>VerseFeed</Text>
    </View>
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      { children }
    </View>
    <View style={{ backgroundColor: styles.primary, height: 70 }} />
  </View>
);

Screen.propTypes = {
  children: PropTypes.node.isRequired,
};

const OnBoarding = () => (
  <Swiper dotColor={styles.white} activeDotColor={styles.gray}>
    <Screen>
      <Image
        resizeMode="contain"
        style={{ height: 150, marginBottom: 50 }}
        source={NotificationIcon}
      />
      <Text style={{ fontWeight: 'bold', color: styles.secondary, fontSize: 20, textAlign: 'center' }}>
        Get daily reminders to read your verses.
      </Text>
      <Text style={{ padding: 40 }}>
        Verse feed helps you remember to read each day by sending a customized reminder.
        Set it for any time, and change it whenever you want!
      </Text>
    </Screen>
    <Screen />
    <Screen />
  </Swiper>
);

export default OnBoarding;
