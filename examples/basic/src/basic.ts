import { IS_AOT, IS_BUILD } from 'runtime-compiler/env';
import { evaluate, deref, createRef } from 'runtime-compiler/globals';

// Store compiled values
const fn = createRef<() => void>();

// Only log when building
IS_BUILD && console.log('Building...');

// Evaluate before deref
evaluate(IS_AOT || `$[${fn}]=()=>console.log("Hi");`);
IS_BUILD || deref(fn)();
