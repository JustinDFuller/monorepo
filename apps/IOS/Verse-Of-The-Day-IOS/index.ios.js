import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import {
  defaultState,
} from './src/state';
import NavigationBar from './src/navigationBar';
import dataHandler from './src/reading/dataHandler';
import storage from './src/storage';
import styles from './src/constants/styles';
import FullText from './src/fullText';
import notifications from './src/notifications';
import TopNotification from './src/TopNotification';

async function getVersions() {
  let versions = await storage.getJSON('BibleVersions');
  versions = versions && versions.versions;

  if (!versions) {
    versions = await fetch('https://api.versefeed.com/versions');
    versions = await versions.json();
  }

  storage.setJSON('BibleVersions', { versions });
  return versions;
}

export default class VerseOfTheDayIOS extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.onUpdate = key => this.updateState(key).bind(this);
  }

  async componentDidMount() {
    this.getters('verses');
    this.getters('bibleVersions');
    this.getters('bibleVersion', 'eng-ESV');
    this.getters('notifications', this.state.notifications);
  }

  async getters(key, defaultValue) {
    const actions = {
      verses: () => {
        this.updateState('loading')(true);
        return dataHandler.getVerses(defaultValue);
      },
      bibleVersions: () => getVersions(),
      bibleVersion: () => storage.get('SelectedBibleVersion'),
      notifications: async () => {
        const res = await storage.getJSON('notifications');
        if (res && res.date) {
          res.date = new Date(res.date);
        }
        return res;
      },
    };

    if (actions[key]) {
      const res = await actions[key]();
      this.updateState(key)(res || defaultValue);

      if (key === 'verses') {
        this.updateState('loading')(false);
      }
    }
  }

  async actions(key, value) {
    const actions = {
      bibleVersion: async () => {
        storage.set('SelectedBibleVersion', value);
        this.getters('verses', value);
      },
      notifications,
    };

    if (actions[key]) {
      actions[key](value);
    }
  }

  updateState(key) {
    const newState = {};
    return (value) => {
      newState[key] = value;
      this.setState(oldState => Object.assign(oldState, newState));
      this.actions(key, value);
    };
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: styles.offwhite }}>
        {
         // <OnBoarding />
        }
        {
          this.state.loading &&
          <TopNotification text="One moment please.. looking for updates now!" />
        }

        {
          !this.state.loading && this.state.verses && this.state.verses.length < 3 &&
          <TopNotification
            type="error"
            text="Oops! It seems something has gone wrong. Please try again later!"
          />
        }

        {
          this.state.readFullText &&
          <FullText
            readFullText={this.state.readFullText}
            back={() => this.updateState('readFullText')(null)}
          />
        }
        <NavigationBar
          state={this.state}
          onUpdate={this.onUpdate}
        />
      </View>
    );
  }
}
