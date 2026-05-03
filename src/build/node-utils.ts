import { Worker, type WorkerOptions } from 'node:worker_threads';

let curRes: (value?: any) => any, curRej: (value?: any) => any;
export const getPromiseResolvers = (res: any, rej: any): void => {
  curRes = res;
  curRej = rej;
};

const workerOptions: WorkerOptions = { eval: true };

export const runInWorker = <T>(code: string): Promise<T> => {
  const p = new Promise<T>(getPromiseResolvers);

  const worker = new Worker(code, workerOptions);
  worker.once('message', curRes);
  worker.once('error', curRej);

  return p;
};
