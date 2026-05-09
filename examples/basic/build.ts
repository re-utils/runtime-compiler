import { build } from 'rolldown';
import rtc from 'runtime-compiler/build/rolldown';

build({
  input: {
    basic: 'src/basic.ts',
    minimal: 'src/minimal.ts',
  },
  output: {
    dir: 'dist',
    minify: {
      compress: true,
      mangle: true,
    },
  },
  plugins: [
    rtc(),
  ],
});
