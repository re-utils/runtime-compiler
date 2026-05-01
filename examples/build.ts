import { buildModule, buildModuleTypes } from 'runtime-compiler/build/node';

import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

import { build } from 'rolldown';
import terser from '@rollup/plugin-terser';

const BUILD_DIR = join(import.meta.dirname, '.build');
const MODULE = join(import.meta.dirname, 'main.ts');

const OUTFILE = join(import.meta.dirname, 'index.js');
const OUTTYPES = join(import.meta.dirname, 'index.d.ts');

try {
  mkdirSync(BUILD_DIR);
} catch {}

await Promise.all([
  buildModule(BUILD_DIR, MODULE, OUTFILE).then(() => {
    build({
      input: OUTFILE,
      output: {
        file: OUTFILE,
      },
      plugins: [
        terser({
          module: true,
          compress: {
            passes: 2,
          }
        }),
      ],
    });
  }),
  buildModuleTypes(MODULE, OUTTYPES),
]);
