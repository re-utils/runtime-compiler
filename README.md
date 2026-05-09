A code generation system.

# Usage
```ts
import { IS_AOT } from 'runtime-compiler/env';
import { emit, evaluate } from 'runtime-compiler/globals';

// Only emit code if not in AOT mode
IS_AOT || emit(`return()=>console.log("Hi")`);

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
