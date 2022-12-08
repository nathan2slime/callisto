import { Platform } from 'react-native';

declare var __SUBPLATFORM__:
  | 'electron'
  | 'browser-ext'
  | 'android-tv'
  | 'ios-tv'
  | 'next'
  | undefined;

export const isDev = __DEV__;

export let subplatform: typeof __SUBPLATFORM__ = undefined;

if (typeof __SUBPLATFORM__ === 'string') {
  subplatform = __SUBPLATFORM__;
} else if (Platform.isTV && Platform.OS === 'ios') {
  subplatform = 'ios-tv';
} else if (Platform.isTV && Platform.OS === 'android') {
  subplatform = 'android-tv';
}
