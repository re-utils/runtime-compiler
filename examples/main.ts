import { IS_AOT } from 'runtime-compiler/env';
import { reserveArtifact } from 'runtime-compiler/artifact';
import { emit } from 'runtime-compiler/globals';

const fn = reserveArtifact<() => void>();
IS_AOT || emit(`$[${fn}]=()=>console.log("Hi");`);

export default { fn };
