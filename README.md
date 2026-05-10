A code generation system.

# Usage
```ts
import { IS_AOT, IS_BUILD } from 'runtime-compiler/env';
import { evaluate } from 'runtime-compiler/globals';

// Only log when building
IS_BUILD && console.log('Building...');

// Only emit code if not in AOT mode
const fn = evaluate<() => void>(IS_AOT || `return()=>console.log("Hi")`);

// Run only when not in build mode
IS_BUILD || fn();
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
