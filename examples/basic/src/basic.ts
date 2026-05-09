import { IS_AOT, IS_BUILD } from 'runtime-compiler/env';
import { emit, evaluate, deref, createRef } from 'runtime-compiler/globals';

// Reserve an artifact slot to build to later
const fn = createRef<() => void>();

// Only emit code if not in AOT mode
IS_AOT || emit(`$[${fn}]=()=>console.log("Hi");`);

// Only log when building
IS_BUILD && console.log('Building...');

// Evaluate before accessing the artifacts
evaluate();
deref(fn)();
