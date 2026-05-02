import { aotModuleBuilder as genericAOTModuleBuilder } from './index.ts';
import { Worker, type WorkerOptions } from 'node:worker_threads';

let curRes: () => void, curRej: () => void;
const getPromiseResolvers = (res: any, rej: any) => {
  curRes = res;
  curRej = rej;
};

export const aotModuleBuilder = (mod: string, outputFile: string): string =>
  genericAOTModuleBuilder(mod) +
  `import{parentPort as p}from"node:worker_threads";import{writeFileSync as w}from"node:fs";w(${JSON.stringify(outputFile)},s);p.postMessage(null)`;

export const runAOTModuleBuilder = (mod: string | URL, workerOptions?: WorkerOptions): Promise<any> => {
  // Run the builder in a worker
  const promise = new Promise<any>(getPromiseResolvers);

  const worker = new Worker(mod, workerOptions);
  worker.once('message', curRes);
  worker.once('error', curRej);

  return promise;
};
