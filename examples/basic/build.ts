import { build } from 'rolldown';
import rtc from 'runtime-compiler/build/rolldown';

build({
  input: {
    typebox: 'src/typebox.ts',
    basic: 'src/basic.ts',
    minimal: 'src/minimal.ts',
  },
  output: {
    dir: 'dist',
    minify: {
      compress: true,
      mangle: false,
      codegen: {
        removeWhitespace: false
      }
    }
  },
  plugins: [rtc()],
});
