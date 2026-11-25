import { Worker } from 'node:worker_threads';

export type Artifacts = [startIdx: number, endIdx: number, value: string][];

export const evaluate = (code: string): Promise<Artifacts> =>
  new Promise((res, rej) => {
    const worker = new Worker(code, {
      eval: true,
    });
    worker.once('message', (msg) => {
      res(msg);
      worker.terminate();
    });
    worker.once('error', rej);
  });
