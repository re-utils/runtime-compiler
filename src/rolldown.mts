import type { Plugin } from 'rolldown';
import { evaluate, update } from './evaluate.mts';
import { generateTransform, rolldownString } from 'rolldown-string';

const rtc = (options?: { evaluate?: boolean }): Plugin => ({
  name: 'rolldown-plugin-runtime-compiler',
  resolveId: {
    order: 'pre',
    filter: {
      id: /^runtime-compiler$/,
    },
    handler: () => false,
  },
  async renderChunk(code, chunk, _, meta) {
    const importIdx = chunk.imports.indexOf('runtime-compiler');
    if (importIdx === -1) return null;

    const ms = rolldownString(code, chunk.fileName, meta);

    // remove runtime-compiler import
    chunk.imports.splice(importIdx, 1);
    ms.replace(/import (.*) from.?.runtime-compiler./, (_, $1) => `const ${$1}=(v,_)=>v;`);

    // apply artifacts
    options?.evaluate === false || update(ms, code, await evaluate(code));
    return generateTransform(ms, chunk.fileName);
  },
});
export default rtc;
