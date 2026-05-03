import type { HookFilter, Plugin } from 'rolldown';
import { runInWorker } from './node-utils.ts';

export interface Options {
  filter: HookFilter;
}

export default (options: Options): Plugin => ({
  name: 'unplugin-runtime-compiler',
  transform: {
    filter: options.filter,
    handler: async (code) =>
      `import"runtime-compiler/env/aot";${code};import{__rtcpl_atf__}from"runtime-compiler/artifact";{${await runInWorker(
        `import"runtime-compiler/env/build";${
          // Run code in BUILD mode
          code
        };import{content as __rtcpl_ct__}from"runtime-compiler/globals";import{parentPort as __rtcpl_pp__}from"node:worker_threads";__rtcpl_pp__.postMessage(__rtcpl_ct__);`,
      )}}`,
  },
});
