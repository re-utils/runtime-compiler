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

Build with `rolldown`:
```ts
...
import rtc from 'runtime-compiler/rolldown';

export default defineConfig({
  plugins: [rtc()]
});
```

Or Vite:
```ts
import rtc from 'runtime-compiler/rolldown';

export default defineConfig({
  // Only run this plugin on build
  build: {
    rolldownOptions: {
      plugins: [rtc()]
    }
  }
});
```

## Limitations
- AOT only works if all `evaluate()` calls are at startup time.
- Dependencies marked as external that uses `runtime-compiler` will run in JIT mode even after AOT build.
