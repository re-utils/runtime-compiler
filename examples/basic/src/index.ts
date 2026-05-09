import { IS_AOT, IS_BUILD } from 'runtime-compiler/env';

import { emit, evaluate, artifact, reserveArtifact } from 'runtime-compiler/globals';

// Reserve an artifact slot to build to later
const fn = reserveArtifact<() => void>();

// Only emit code if not in AOT mode
IS_AOT || emit(`$[${fn}]=()=>console.log("Hi");`);

// Can skip operations that does not
// relate to building code in BUILD mode
IS_BUILD && console.log('Building...');

// Evaluate before accessing the artifacts
evaluate();
artifact(fn)();
