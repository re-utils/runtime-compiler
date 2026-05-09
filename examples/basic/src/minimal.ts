import { IS_AOT, IS_BUILD } from 'runtime-compiler/env';
import { emit, evaluate } from 'runtime-compiler/globals';

// Only emit code if not in AOT mode
IS_AOT || emit(`return()=>console.log("Hi")`);

// Can skip operations that does not
// relate to building code in BUILD mode
IS_BUILD && console.log('Building...');

// Run emitted code
const fn = evaluate<() => void>();
fn();
