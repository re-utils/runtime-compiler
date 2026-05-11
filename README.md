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

If you have dependencies marked as external that uses `runtime-compiler`:
```ts
rtc({
  // Return true if the package uses 'runtime-compiler' at startup time without pre-building.
  useLoader: (externalPkg) => ...
});
```

## Limitation
Library code and startup code that uses `runtime-compiler` cannot be mixed together in the same bundle.
```ts
import { IS_AOT } from 'runtime-compiler/env';
import { evaluate } from 'runtime-compiler/globals';

const fn = evaluate<typeof console.log>(IS_AOT || `return console.log`)('Hi');

// AOT build will break this export
export const createFn = () => evaluate<typeof console.log>(IS_AOT || `return console.log`);
```
