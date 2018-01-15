import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import VerseOfTheDayIOS from './Verse-Of-The-Day-IOS/index.ios';

export default class App extends React.Component {
  render() {
    return (
      <VerseOfTheDayIOS />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
