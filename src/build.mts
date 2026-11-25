import uneval, { type UnevalOptions } from 'uneval';

import process from 'node:process';
import { parentPort } from 'node:worker_threads';

process.on('beforeExit', () => {
  artifacts.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));
  parentPort!.postMessage(artifacts);
});

const artifacts: [lineIdx: number, posIdx: number, serializedValue: string][] = [];
const options: UnevalOptions = {
  custom: (value) => {
    if (typeof value === 'function') {
      let str = '' + value;

      // classes
      if (str.startsWith('class ')) throw new Error('Cannot serialize classes!');

      // class methods
      if (!Object.hasOwn(value, 'prototype') && !str.includes('=>', 1)) str = 'function ' + str;

      return str;
    }
  },
};

/**
 * @internal
 */
export default (value: unknown): unknown => {
  const pos = /:([0-9]+):([0-9]+)/.exec(new Error().stack!.split('\n', 3)[2])!;
  try {
    artifacts.push([+pos[1] - 1, +pos[2] - 1, uneval(value, options)]);
  } catch (e) {
    console.error(e);
  }
  return value;
};
