import { globSync } from 'node:fs';

import { defineConfig } from 'rolldown';
import rtc from 'runtime-compiler/rolldown';

export default defineConfig({
  input: globSync('src/**/*'),
  experimental: {
    nativeMagicString: true,
  },
  plugins: [rtc()],
});
