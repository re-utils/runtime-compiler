import { IS_AOT, IS_BUILD } from 'runtime-compiler/env';
import { evaluate } from 'runtime-compiler/globals';

// Only log when building
IS_BUILD && console.log('Building...');

// Only emit code if not in AOT mode
const fn = evaluate<() => void>(IS_AOT || `return()=>console.log("Hi")`);

// Run only when not in build mode
IS_BUILD || fn();
