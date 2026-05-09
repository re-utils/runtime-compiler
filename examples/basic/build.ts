// @ts-check
import { build } from 'rolldown';

import rt from 'runtime-compiler/build/rolldown';

build({
  input: {
    basic: 'src/basic.ts',
    minimal: 'src/minimal.ts'
  },
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
