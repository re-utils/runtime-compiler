# `runtime-compiler`
A code generation system for JS.

## Modes
- `default`: Build & run.
- `build`: Build only.
- `hydrate`: Run only.

```ts
import { isHydrating, onlyBuild } from 'runtime-compiler/config';

// Whether the process is in `hydrate` mode
isHydrating;

// Whether the process is in `build` mode
onlyBuild;
```
