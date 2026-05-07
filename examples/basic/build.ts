// @ts-check
import { build } from 'rolldown';

import rt from 'runtime-compiler/build/rolldown';

build({
  input: 'src/index.entry.ts',
  output: {
    dir: 'dist',
  },
  plugins: [
    // AOT build (should be the last transform step)
    rt({
      filter: {
        id: /\.entry\.ts$/
      }
    }),
  ],
});
