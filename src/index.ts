import { IS_AOT, IS_BUILD } from './env/index.ts';

const __rtcpl_r__: unknown[] = [];

export type Ref<T> = number & {
  '~': T;
};

export const ref = <T>(value: T): Ref<T> => (__rtcpl_r__.push(value) - 1) as any;
export const createRef = <T>(): Ref<T> => (__rtcpl_r__.push(undefined) - 1) as any;

/**
 * All emitted code.
 *
 * Codes are prepended.
 * @internal
 */
export let __rtcpl_ct__: string = '';

export let evaluate: <T>(content?: any) => T = IS_AOT
  ? () => __rtcpl_aot_fns__.pop()!(__rtcpl_r__)
  : IS_BUILD
    ? (content) => {
        if (typeof content !== 'string')
          throw new Error('Expected a string for content in JIT & BUILD mode');

        content = `$=>{${content}}`;
        __rtcpl_ct__ = content + ',' + __rtcpl_ct__;
        return (0, eval)('"use strict";' + content)(__rtcpl_r__);
      }
    : (content) => {
        if (typeof content !== 'string')
          throw new Error('Expected a string for content in JIT & BUILD mode');

        return (0, eval)(`"use strict";$=>{${content}}`)(__rtcpl_r__);
      };

export let evaluateAsync: <T>(content?: any) => Promise<T> = IS_AOT
  ? evaluate
  : IS_BUILD
    ? (content) => {
        if (typeof content !== 'string')
          throw new Error('Expected a string for content in JIT & BUILD mode');

        content = `async $=>{${content}}`;
        __rtcpl_ct__ = content + ',' + __rtcpl_ct__;
        return (0, eval)('"use strict";' + content)(__rtcpl_r__);
      }
    : (content) => {
        if (typeof content !== 'string')
          throw new Error('Expected a string for content in JIT & BUILD mode');

        return (0, eval)(`"use strict";async $=>{${content}}`)(__rtcpl_r__);
      };

/**
 * Store compiled code as functions to run in AOT mode.
 * @internal
 */
export const __rtcpl_aot_fns__: ((args: any[]) => any)[] = [];

export const deref: <T>(id: Ref<T>) => T = (id) => __rtcpl_r__[id] as any;
