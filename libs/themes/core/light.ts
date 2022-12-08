import { Theme } from '../types';
import { dark } from './dark';

export const light: Theme = {
  ...dark,
  primaryColorLight: '#EA732A',
  primaryColorDark: '#EA732A',
  backgroundColor: '#fff3e0',
  foregroundColorLight: '#fffefc',
  textColor: '#0f111c',
  foregroundColorDark: '#fffefc',
  errorColorDark: '#f43535',
  borderColor: '#eaedef',
};
