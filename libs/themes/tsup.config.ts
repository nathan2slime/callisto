import { defineConfig } from 'tsup';

import { include } from './tsconfig.json';

export default defineConfig({
  entry: include,
  splitting: false,
  dts: true,
  outDir: 'dist',
  skipNodeModulesBundle: true,
  sourcemap: false,
  tsconfig: 'tsconfig.json',
  clean: true,
});
