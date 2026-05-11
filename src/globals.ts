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
export let __rtcpl_ct__: string;

export let evaluate: <T>(content?: string | boolean | null | undefined) => T = IS_AOT
  ? (_) => __rtcpl_aot_fns__.pop()!(__rtcpl_r__)
  : IS_BUILD
    ? (content) => {
        if (typeof content === 'string') {
          content = `$=>{${content}}`;
          __rtcpl_ct__ = content + ',' + __rtcpl_ct__;
          return (0, eval)(content)(__rtcpl_r__);
        }
        __rtcpl_ct__ = '$=>{},' + __rtcpl_ct__;
      }
    : (content) => {
        if (typeof content === 'string') return (0, eval)(`$=>{${content}}`)(__rtcpl_r__);
      };

export let evaluateAsync: <T>(content?: string | boolean | null | undefined) => Promise<T> = IS_AOT
  ? async (_) => __rtcpl_aot_fns__.pop()!(__rtcpl_r__)
  : IS_BUILD
    ? async (content) => {
        if (typeof content === 'string') {
          content = `async $=>{${content}}`;
          __rtcpl_ct__ = content + ',' + __rtcpl_ct__;
          return (0, eval)(content)(__rtcpl_r__);
        }
        __rtcpl_ct__ = 'async $=>{},' + __rtcpl_ct__;
      }
    : async (content) => {
        if (typeof content === 'string') return (0, eval)(`async $=>{${content}}`)(__rtcpl_r__);
      };

/**
 * Store compiled code as functions to run in AOT mode.
 * @internal
 */
export const __rtcpl_aot_fns__: ((args: any[]) => any)[] = [];

export const deref: <T>(id: Ref<T>) => T = (id) => __rtcpl_r__[id] as any;
