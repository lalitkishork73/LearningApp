import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

let MMKVStorage: any = null;


if (!__DEV__) {
  try {
    const { MMKV } = require('react-native-mmkv');
    MMKVStorage = new MMKV();
  } catch (e) {
    console.log('MMKV not available, falling back to AsyncStorage');
  }
}

export const storage = {
  async set(key: string, value: string) {
    if (MMKVStorage) {
      MMKVStorage.set(key, value);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  },

  async get(key: string) {
    if (MMKVStorage) {
      return MMKVStorage.getString(key);
    } else {
      return await AsyncStorage.getItem(key);
    }
  },

  async remove(key: string) {
    if (MMKVStorage) {
      MMKVStorage.delete(key);
    } else {
      await AsyncStorage.removeItem(key);
    }
  },
};
