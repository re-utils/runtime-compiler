import { IS_AOT, IS_BUILD } from 'runtime-compiler/env';

import { reserveArtifact } from 'runtime-compiler/artifact';
import { emit } from 'runtime-compiler/globals';

import { artifacts } from 'runtime-compiler';

// Reserve an artifact slot to build to later
const fn = reserveArtifact<() => void>();

// Only emit code if not in AOT mode
IS_AOT || emit(`__rtcpl_atf__[${fn}]=()=>console.log("Hi");`);

// Can skip operations that does not
// relate to building code in BUILD mode
IS_BUILD && console.log('Building...');

// Export artifacts
export const artifact = artifacts({ fn });
