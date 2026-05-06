import type { Plugin } from 'rolldown';
import { runInWorker } from './node-utils.ts';

export interface Options {
  filter: Exclude<
    Plugin['transform'] & {},
    (...args: any[]) => any
  >['filter'] & {};
}

export default (options: Options): Plugin => ({
  name: 'unplugin-runtime-compiler',
  transform: {
    filter: options.filter,
    handler: async (code) =>
      `import"runtime-compiler/env/aot";${code};import{__rtcpl_atf__}from"runtime-compiler/artifact";{${
        // Run in a separate global
        await runInWorker(
          `import"runtime-compiler/env/build";${
            // Run code in BUILD mode
            code
          };import{content as __rtcpl_ct__}from"runtime-compiler/globals";import{parentPort as __rtcpl_pp__}from"node:worker_threads";__rtcpl_pp__.postMessage(__rtcpl_ct__);`,
        )
      }}`,
  },
});
