import { Worker, type WorkerOptions } from 'node:worker_threads';

const workerOptions: WorkerOptions = { eval: true };

/**
 * Requires code to not bundle "runtime-compiler/env" and "runtime-compiler"
 */
export const runInWorker = (code: string): Promise<string> =>
  new Promise((res, rej) => {
    const worker = new Worker(
      `import"runtime-compiler/env/build";${
        // Run code in BUILD mode
        code
      };\nimport{__rtcpl_ct__}from"runtime-compiler";import{parentPort as __rtcpl_pp__}from"node:worker_threads";__rtcpl_pp__.postMessage(__rtcpl_ct__)`,
      workerOptions,
    );

    worker.once('message', (msg) => {
      res(msg);
      worker.terminate();
    });
    worker.once('error', rej);
  });

/**
 * Requires code to not bundle `runtime-compiler/env` and `runtime-compiler`
 *
 * @example
 * writeFileSync('preload.js', compile(await runInWorker(code)));
 * code = 'import"./preload.js";' + code;
 */
export const compile = (codes: string): string =>
  `import"runtime-compiler/env/aot";import{__rtcpl_aot_fns__ as a}from"runtime-compiler";a.push(${codes})`;
