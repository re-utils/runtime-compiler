import { runAOTModuleBuilder, aotModuleBuilder } from 'runtime-compiler/build/node';
import { moduleTypes, jitModule } from 'runtime-compiler/build';

import { join } from 'node:path';

import { build } from 'rolldown';
import terser from '@rollup/plugin-terser';
import { writeFile } from 'node:fs/promises';

const MODULE = join(import.meta.dirname, 'src/main.ts');
const OUTFILE = join(import.meta.dirname, 'lib/main.js');
const OUTTYPES = join(import.meta.dirname, 'lib/main.d.ts');

const buildAOT = async () => {
  {
    let t = performance.now();

    await runAOTModuleBuilder(
      aotModuleBuilder(MODULE, OUTFILE),
      { eval: true }
    );

    t = performance.now() - t;
    console.info('build time:', t);
  }

  return build({
    input: OUTFILE,
    output: {
      file: OUTFILE,
    },
    plugins: [
      terser({
        module: true,
        compress: {
          passes: 2,
        },
        mangle: false,
      }),
    ],
  });
};

await Promise.all([
  process.argv.includes('--production') ? buildAOT() : writeFile(OUTFILE, jitModule(MODULE)),
  writeFile(OUTTYPES, moduleTypes(MODULE)),
]);
