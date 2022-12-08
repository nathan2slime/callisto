// Dependencies
import { Signale, SignaleOptions } from 'signale';

// Utils
import envs from '../../env';

const options: SignaleOptions = {
  disabled: envs.NODE_ENV == 'test',
  interactive: false,
  scope: envs.NODE_ENV,
  config: {
    uppercaseLabel: true,
    displayTimestamp: true,
    underlineLabel: false,
    displayFilename: true,
  },
  logLevel: 'info',
  secrets: [],
  types: {
    error: {
      badge: '🍎',
      color: 'red',
      label: '[failed]',
      logLevel: 'error',
    },
    star: {
      badge: '⭐',
      color: 'yellow',
      label: '[star]',
      logLevel: 'star',
    },
    warn: {
      badge: '🍊',
      color: 'yellow',
      label: '[warning]',
      logLevel: 'warn',
    },
    success: {
      badge: '🌵',
      color: 'green',
      label: '[success]',
      logLevel: 'success',
    },
    info: {
      badge: '🐸',
      color: 'red',
      label: '[info]',
      logLevel: 'info',
    },
    await: {
      badge: '⏱️',
      color: 'cyan',
      label: '[awaiting]',
      logLevel: 'await',
    },
    complete: {
      badge: '✅',
      color: 'green',
      label: '[completed]',
      logLevel: 'completed',
    },
    start: {
      badge: '🌱',
      color: 'cyan',
      label: '[started]',
      logLevel: 'start',
    },
    debug: {
      badge: '🐠',
      color: 'blue',
      label: '[debug]',
      logLevel: 'blue',
    },
    note: {
      badge: '📒',
      color: 'yellow',
      label: '[note]',
      logLevel: 'note',
    },
    pending: {
      badge: '💭',
      color: 'white',
      label: '[pending]',
      logLevel: 'pending',
    },
  },
};

export default new Signale(options);
