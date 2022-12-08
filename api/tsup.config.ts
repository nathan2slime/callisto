import { defineConfig } from 'tsup';

import { include } from './tsconfig.json';

export default defineConfig({
  entry: include,
  splitting: false,
  dts: false,
  outDir: 'dist',
  skipNodeModulesBundle: true,
  sourcemap: false,
  tsconfig: 'tsconfig.json',
  clean: true,
  loader: {
    '.gql': 'file',
    '.log': 'file',
  },
});
