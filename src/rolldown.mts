import type { RolldownMagicString, Plugin } from 'rolldown';
import { evaluate, type Artifacts } from './utils.mts';
import { Visitor } from 'rolldown/utils';

// sync parse & overwrite calls to evaluate() with the evaluated value
let _artifacts!: Artifacts,
  // current artifact index
  _cur_artifacts_idx!: number,
  // source code magic string
  _ms!: RolldownMagicString,
  // fn name of the imported evaluate function
  _fn_name!: string,
  visitor = new Visitor({
    CallExpression(node) {
      while (_cur_artifacts_idx < _artifacts.length && node.start > _artifacts[_cur_artifacts_idx][0])
        _cur_artifacts_idx++;

      // stop ast tranverse if out of bound
      if (_artifacts.length === _cur_artifacts_idx) throw null;

      const artifact = _artifacts[_cur_artifacts_idx];
      if (artifact[0] === node.start) {
        const { callee } = node;
        if (callee.type === 'Identifier' && callee.name === _fn_name) _ms.overwrite(node.start, node.end, `(${artifact[2]})`);
      }
    },
  });

const rtc = (options?: { evaluate?: boolean }): Plugin => ({
  name: 'rolldown-plugin-runtime-compiler',
  resolveId: {
    order: 'pre',
    filter: {
      id: /^runtime-compiler$/,
    },
    handler: () => ({
      id: 'runtime-compiler/build',
      external: 'absolute',
    }),
  },
  async renderChunk(code, chunk, _, meta) {
    const importIdx = chunk.imports.indexOf('runtime-compiler/build');
    if (importIdx === -1) return null;

    const ms = meta.magicString;
    if (ms == null) {
      this.warn('This plugin requires Rolldown native MagicString support!');
      return null;
    }

    // remove runtime-compiler/build import
    let fn_name!: string;
    chunk.imports.splice(importIdx, 1);
    ms.replace(
      /import (.*) from.?.runtime-compiler\/build./,
      (_, $1) => `const ${fn_name = $1}=v=>v`,
    );

    // apply artifacts
    if (options?.evaluate !== false) {
      this.debug(`evaluating chunk "${chunk.fileName}" in a worker`);
      let time = performance.now();

      const artifacts = await evaluate(code);

      time = performance.now() - time;
      this.debug(`evaluated chunk "${chunk.fileName}" in ${time.toFixed(2)}ms`);

      this.debug(`replace "${chunk.fileName}" evaluate() calls with evaluated values`);
      time = performance.now();

      // Infer actual start positions of the call expressions in the code string
      for (let entryIdx = 0, currentLine = 0, eolIdx = 0; entryIdx < artifacts.length; entryIdx++) {
        const entry = artifacts[entryIdx],
          entryLine = entry[0];
        while (currentLine < entryLine) {
          eolIdx = code.indexOf('\n', eolIdx) + 1;
          currentLine++;
        }

        entry[0] = eolIdx + entry[1];
      }

      try {
        _artifacts = artifacts;
        _cur_artifacts_idx = 0;
        _ms = ms;
        _fn_name = fn_name;
        visitor.visit(this.parse(code));
      } catch (e) {
        // visit stops
        if (e !== null)
          throw e;
      }

      time = performance.now() - time;
      this.debug(`replace "${chunk.fileName}" evaluate() calls in ${time.toFixed(2)}ms`);
    }

    return { code: ms };
  },
});
export default rtc;
