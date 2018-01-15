import {
  AsyncStorage,
} from 'react-native';

const storage = {
  async get(key) {
    try {
      return await AsyncStorage.getItem(`@VerseOfTheDay:${key}`);
    } catch (error) {
      return this.handleError(error);
    }
  },
  async set(key, value) {
    try {
      return await AsyncStorage.setItem(`@VerseOfTheDay:${key}`, value);
    } catch (error) {
      return this.handleError(error);
    }
  },
  async setJSON(key, value) {
    try {
      return await this.set(key, JSON.stringify(value));
    } catch (error) {
      return this.handleError(error);
    }
  },
  async getJSON(key) {
    try {
      const res = await this.get(key);
      return JSON.parse(res);
    } catch (error) {
      return this.handleError(error);
    }
  },
  handleError(error) {
    console.error('Error while working with local storage.', error);
  },
};

export default storage;
