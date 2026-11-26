A compile time evaluation system.

```ts
// src/index.mts
import evaluate from 'runtime-compiler';

const fib = (i) => (i < 2 ? i : fib(i - 1) + fib(i - 2));
export default evaluate(fib(12));

// rolldown.config.mts
import { defineConfig } from 'rolldown';
import rtc from 'runtime-compiler/rolldown';

export default defineConfig({
  input: 'src/index.mts',
  experimental: {
    nativeMagicString: true,
  },
  plugins: [rtc()],
});

// or vite.config.mts
import rtc from 'runtime-compiler/rolldown';

export default defineConfig({
  // Only run this plugin on build
  build: {
    rolldownOptions: {
      experimental: {
        nativeMagicString: true,
      },
      plugins: [rtc()]
    }
  }
});

// dist/index.js
var fib_default = 144;
export { fib_default as default };
```
