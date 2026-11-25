import type { RolldownMagicString, Plugin } from 'rolldown';
import { evaluate, type Artifacts } from './utils.mts';
import { Visitor } from 'rolldown/utils';

// sync parse & overwrite calls to evaluate() with the evaluated value
let _artifacts!: Artifacts,
  _nextArtifactsIdx!: number,
  _magicString!: RolldownMagicString,
  visitor = new Visitor({
    CallExpression(node) {
      // stop ast tranverse
      if (_artifacts.length === _nextArtifactsIdx) throw null;

      const artifact = _artifacts[_nextArtifactsIdx];
      if (artifact[0] === node.start) {
        _magicString.overwrite(node.start, node.end, `(${artifact[2]})`);
        _nextArtifactsIdx++;
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

    const { magicString } = meta;
    if (magicString == null) {
      this.warn('This plugin requires Rolldown native MagicString support!');
      return null;
    }

    // remove runtime-compiler/build import
    chunk.imports.splice(importIdx, 1);
    magicString.replace(
      /import (.*) from.?.runtime-compiler\/build./,
      (_, $1) => `const ${$1}=v=>v`,
    );

    // apply artifacts
    if (options?.evaluate !== false) {
      this.info(`evaluating chunk "${chunk.fileName}" in a worker...`);
      let time = performance.now();

      const artifacts = await evaluate(code);

      time = performance.now() - time;
      this.info(`evaluated chunk "${chunk.fileName}" in ${time.toFixed(2)}ms`);

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
        // can't race condition here so this is fine
        _artifacts = artifacts;
        _nextArtifactsIdx = 0;
        _magicString = magicString;
        visitor.visit(this.parse(code));
      } catch (e) {
        // visit stops
        if (e !== null)
          throw e;
      }

      return { code: magicString };
    }
  },
});
export default rtc;
