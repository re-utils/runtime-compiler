import { Worker, type WorkerOptions } from 'node:worker_threads';

let curRes: (value?: any) => any, curRej: (value?: any) => any;
export const getPromiseResolvers = (res: any, rej: any): void => {
  curRes = res;
  curRej = rej;
};

const workerOptions: WorkerOptions = { eval: true };

/**
 * Requires code to not bundle "runtime-compiler/env" and "runtime-compiler/globals"
 */
export const runInWorker = (code: string): Promise<string> => {
  const p = new Promise<any>(getPromiseResolvers);

  const worker = new Worker(
    `import"runtime-compiler/env/build";${
      // Run code in BUILD mode
      code
    };\nimport{__rtcpl_ct__}from"runtime-compiler/globals";import{parentPort as __rtcpl_pp__}from"node:worker_threads";__rtcpl_ct__[0];__rtcpl_pp__.postMessage(__rtcpl_ct__)`,
    workerOptions,
  );
  worker.once('message', curRes);
  worker.once('error', curRej);

  return p;
};

/**
 * Requires code to not bundle `runtime-compiler/env` and `runtime-compiler/globals`
 *
 * @example
 * writeFileSync('preload.js', compile(await runInWorker(code)));
 * code = 'import"./preload.js";' + code;
 */
export const compile = (codes: string): string =>
  `import"runtime-compiler/env/aot";import{__rtcpl_aot_fns__}from"runtime-compiler/globals";__rtcpl_aot_fns__.push(${codes});`;
