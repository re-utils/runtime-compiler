import { defineConfig } from 'rolldown';
import { minify } from 'terser';

import rt from 'runtime-compiler/build/rolldown';

export default defineConfig({
  input: 'src/index.ts',
  output: {
    dir: 'dist',
  },
  plugins: [
    // AOT build (should be the last transform step)
    rt({
      filter: {
        id: /\.entry\.ts$/,
      },
    }),

    // Significantly faster than @rollup/plugin-terser lol
    {
      name: 'rolldown-plugin-terser',
      renderChunk: (code, chunk) =>
        minify(
          {
            [chunk.fileName]: code,
          },
          {
            sourceMap: true,
            module: true,
            compress: {
              passes: 3,
            },
            mangle: false,
          },
        ),
    },
  ],
});
