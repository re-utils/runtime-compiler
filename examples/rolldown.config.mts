import { defineConfig } from 'rolldown';
import rtc from 'runtime-compiler/rolldown';

export default defineConfig({
  input: ['src/fib.mts', 'src/mapl.mts'],
  plugins: [rtc()],
});
