import { Worker } from 'node:worker_threads';

export const evaluate = (
  code: string,
): Promise<[startIdx: number, endIdx: number, value: string][]> =>
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
