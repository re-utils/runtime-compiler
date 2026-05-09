A code generation system.

# Usage
```ts
import { IS_AOT, IS_BUILD } from 'runtime-compiler/env';
import { emit, evaluate } from 'runtime-compiler/globals';

// Only emit code if not in AOT mode
IS_AOT || emit(`return()=>console.log("Hi")`);

// Only log when building
IS_BUILD && console.log('Building...');

// Run emitted code
const fn = evaluate<() => void>();
fn();
```

Build with `rolldown` or `vite`:
```ts
...
import rtc from 'runtime-compiler/build/rolldown';

export default defineConfig({
  ...,
  plugins: [
    ...,
    rtc()
  ]
});
```

You only need to build when the target runtime doesn't allow `eval()`.
