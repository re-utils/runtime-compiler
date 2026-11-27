import process from 'node:process';
import { parentPort } from 'node:worker_threads';

import type { Artifacts } from './utils.mts';

process.on('beforeExit', () => {
  parentPort!.postMessage(artifacts);
});

type RefData = [recurse: boolean, key: string];

let artifacts: Artifacts = [],
  PROP_REGEXP = /^[$_\p{ID_Start}][$_\p{ID_Continue}]*$/u,
  REFS: Map<any, RefData> = new Map(),
  uneval = (value: unknown, depth: number): string => {
    switch (typeof value) {
      case 'string':
        return JSON.stringify(value);
      case 'boolean':
        return value ? 'true' : 'false';
      case 'number':
        return Object.is(value, -0) ? '-0' : '' + value;
      case 'bigint':
        return value + 'n';
      case 'symbol': {
        switch (value) {
          case Symbol.iterator:
            return 'Symbol.iterator';
          case Symbol.asyncIterator:
            return 'Symbol.asyncIterator';
          case Symbol.dispose:
            return 'Symbol.dispose';
          case Symbol.asyncDispose:
            return 'Symbol.asyncDispose';
        }

        const key = Symbol.keyFor(value);
        if (key == null) throw new Error(`symbol ${value.toString()} cannot be serialized!`);
        return `Symbol.for(${JSON.stringify(key)})`;
      }
      case 'function': {
        let str = '' + value;

        // classes
        if (str.startsWith('class ')) throw new Error('Cannot serialize classes!');
        // class methods
        if (!Object.hasOwn(value, 'prototype') && !str.includes('=>', 1))
          throw new Error('Cannot serialize class methods!');

        return str;
      }
      case 'undefined':
        return 'undefined';
      case 'object':
        if (value === null) return 'null';
    }

    {
      const ref = REFS.get(value);
      if (ref != null) {
        ref[0] = true;
        return ref[1];
      }
    }

    const rootId = 'r' + depth,
      rootData = [false, rootId] satisfies [any, any];
    REFS.set(value, rootData);

    try {
      if (Array.isArray(value)) {
        let str: string = '[',
          setRecursive = '';
        for (let i = 0; i < value.length; i++) {
          const childStr = uneval(value[i], depth + 1);

          // Only set child that uses the recursive value of the root array
          if (rootData[0]) {
            rootData[0] = false;
            setRecursive += rootId + `[${i}]=${childStr},`;
            str += ',';
          } else str += childStr + ',';
        }
        str += ']';

        return setRecursive.length === 0 ? str : `(${rootId}=>(${setRecursive + rootId}))(${str})`;
      }

      const { constructor } = value;
      switch (constructor) {
        case RegExp:
          return '' + value;

        case Date:
        case URL:
        case URLSearchParams:
          return `new ${constructor.name}(${JSON.stringify('' + value)})`;

        case Int8Array:
        case Uint8Array:
        case Uint8ClampedArray:
        case Int16Array:
        case Int32Array:
        case Uint32Array:
        case Float16Array:
        case Float32Array:
        case Float64Array: {
          let str = '';
          for (const v of value as Iterable<any>) str += (str.length === 0 ? '[' : ',') + uneval(v, depth);
          return str.length === 0 ? `new ${constructor.name}()` : `new ${constructor.name}(${str}])`;
        }

        case Set: {
          let str: string = 'new Set([',
            setRecursive = '';
          for (const v of value as Set<unknown>) {
            const childStr = uneval(v, depth + 1);

            // Only set child that uses the recursive value of the root array
            if (rootData[0]) {
              rootData[0] = false;
              setRecursive += rootId + `.add(${childStr}),`;
            } else str += childStr + ',';
          }
          str += '])';

          return setRecursive.length === 0 ? str : `(${rootId}=>(${setRecursive + rootId}))(${str})`;
        }
        case Map: {
          let str: string = 'new Map([',
            setRecursive = '';
          for (const v of value as Map<unknown, unknown>) {
            const kvStr = uneval(v[0], depth + 1) + ',' + uneval(v[1], depth + 1);

            // Only set child that uses the recursive value of the root array
            if (rootData[0]) {
              rootData[0] = false;
              setRecursive += rootId + `.set(${kvStr}),`;
            } else str += `[${kvStr}],`;
          }
          str += '])';

          return setRecursive.length === 0 ? str : `(${rootId}=>(${setRecursive + rootId}))(${str})`;
        }

        case Object:
        case undefined: {
          let str: string = constructor === Object ? '{' : `{__proto__:${uneval(Object.getPrototypeOf(value), depth + 1)},`,
            setRecursive = '';
          for (let key in value) {
            const valueStr = uneval(value[key as keyof typeof value], depth + 1);

            // Only set child that uses the recursive value of the root array
            if (rootData[0]) {
              rootData[0] = false;
              setRecursive += rootId + (PROP_REGEXP.test(key) ? '.' + key : `[${JSON.stringify(key)}]`) + `=${valueStr},`;
            } else str += (PROP_REGEXP.test(key) ? key : JSON.stringify(key)) + `:${valueStr},`;
          }
          for (let i = 0, symbols = Object.getOwnPropertySymbols(value); i < symbols.length; i++) {
            const key = `[${uneval(symbols[i], depth + 1)}]`,
              valueStr = uneval(value[symbols[i] as keyof typeof value], depth + 1);

            // Only set child that uses the recursive value of the root array
            if (rootData[0]) {
              rootData[0] = false;
              setRecursive += rootId + key + `=${valueStr},`;
            } else str += key + `:${valueStr},`;
          }
          str += '}';

          return setRecursive.length === 0 ? str : `(${rootId}=>(${setRecursive + rootId}))(${str})`;
        }
      }

      throw new Error('unsupported constructor: ' + constructor);
    } finally {
      REFS.delete(value);
    }
  };

/**
 * @internal
 */
export default (value: unknown): unknown => {
  const pos = /:([0-9]+):([0-9]+)/.exec(new Error().stack!.split('\n', 3)[2])!;
  try {
    artifacts.push([+pos[1] - 1, +pos[2] - 1, uneval(value, 0)]);
  } catch (e) {
    console.error(e);
  }
  return value;
};
