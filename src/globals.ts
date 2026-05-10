import { IS_AOT, IS_BUILD } from './env/index.ts';

const __rtcpl_r__: unknown[] = [];

export type Ref<T> = number & {
  '~': T;
};

export const importRef = <T>(value: T): Ref<T> => (__rtcpl_r__.push(value) - 1) as any;
export const createRef = <T>(): Ref<T> => (__rtcpl_r__.push(undefined) - 1) as any;

/**
 * All emitted code.
 * @internal
 */
export let __rtcpl_ct__: string[] = [];

export let evaluate: <T>(content?: string | boolean | null | undefined) => T = IS_AOT
  ? (_) => __rtcpl_aot_fns__.pop()!(__rtcpl_r__)
  : IS_BUILD
    ? (content) => {
        if (typeof content === 'string') {
          __rtcpl_ct__.push(content);
          return (0, eval)(`$=>{${content}}`)(__rtcpl_r__);
        } else __rtcpl_ct__.push('');
      }
    : (content) => {
        if (typeof content === 'string') return (0, eval)(`$=>{${content}}`)(__rtcpl_r__);
      };

export const __rtcpl_aot_fns__: ((args: any[]) => any)[] = [];

export const deref: <T>(id: Ref<T>) => T = (id) => __rtcpl_r__[id] as any;
