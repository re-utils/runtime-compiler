import { Worker } from 'node:worker_threads';

import type { __rtcpl_content__ } from './index.mts';

export const evaluate = (
  code: string,
): Promise<[startIdx: number, endIdx: number, value: string][]> =>
  new Promise((res, rej) => {
    const worker = new Worker(
      code +
        '\n\n;import{__rtcpl_content__}from"runtime-compiler";import{parentPort as __rtcpl_port__}from"node:worker_threads";__rtcpl_port__.postMessage(__rtcpl_content__)',
      {
        eval: true,
      },
    );
    worker.once('message', (msg: typeof __rtcpl_content__) => {
      res(msg);
      worker.terminate();
    });
    worker.once('error', rej);
  });

export const update = (
  magicString: {
    update(start: number, end: number, str: string): any;
  },
  code: string,
  artifacts: typeof __rtcpl_content__,
): void => {
  artifacts.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

  for (let entryIdx = 0, currentLine = 0, eolIdx = 0; entryIdx < artifacts.length; entryIdx++) {
    // Infer actual position of the call in the code string
    const entry = artifacts[entryIdx],
      entryLine = entry[0];
    while (currentLine < entryLine) {
      eolIdx = code.indexOf('\n', eolIdx) + 1;
      currentLine++;
    }

    // find entry end
    let entryStart = eolIdx + entry[1],
      entryEnd = entryStart,
      stack = 1;

    // first start of call
    while (code[entryEnd++] !== '(');

    // find end of call
    while (true) {
      const cur = code[entryEnd++];
      if (cur === '(') stack++;
      else if (cur === ')' && --stack == 0) break;
    }

    magicString.update(entryStart, entryEnd, `(${entry[2]})`);
  }
};
