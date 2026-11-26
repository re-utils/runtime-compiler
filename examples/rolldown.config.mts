import { globSync } from 'node:fs';

import { minify } from '@swc/core';

import { defineConfig } from 'rolldown';
import rtc from 'runtime-compiler/rolldown';

export default defineConfig({
  input: globSync('src/**/*'),
  experimental: {
    nativeMagicString: true,
  },
  output: {
    minify: false,
  },
  plugins: [
    rtc(),
    {
      name: 'swc-minify',
      renderChunk: (code, _, options) =>
        minify(code, {
          module: options.format === 'es',
          sourceMap: !!options.sourcemap,
          inlineSourcesContent: !options.sourcemapExcludeSources,

          // custom options
          mangle: true,
          compress: true,
        }),
    },
  ],
  logLevel: 'debug',
});
