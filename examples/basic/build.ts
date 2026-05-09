// @ts-check
import { build } from 'rolldown';

import rt from 'runtime-compiler/build/rolldown';

build({
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    minify: {
      compress: true,
      mangle: true
    }
  },
  plugins: [
    // AOT build (should be the last transform step)
    rt(),
  ],
});
