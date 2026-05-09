import { IS_AOT, IS_BUILD } from './env/index.ts';
import { emptyFn } from './utils.ts';

const __rtcpl_r__: unknown[] = [];

export type Ref<T> = number & {
  '~': T;
};

export const importRef = <T>(value: T): Ref<T> => (__rtcpl_r__.push(value) - 1) as any;
export const createRef = <T>(): Ref<T> => (__rtcpl_r__.push(undefined) - 1) as any;

let content = '';
/**
 * All emitted code.
 * @internal
 */
export let __rtcpl_ct__: string[] = [];

export let evaluate: <T>() => T = IS_AOT
  ? () => __rtcpl_aot_fns__[__rtcpl_aot_fn_idx__++](__rtcpl_r__)
  : IS_BUILD
    ? () => {
        __rtcpl_ct__.push(content);

        const currentContent = content;
        content = '';

        if (currentContent.length > 0) return (0, eval)(`$=>{${currentContent}}`)(__rtcpl_r__);
      }
    : () => {
        const currentContent = content;
        content = '';

        if (currentContent.length > 0) return (0, eval)(`$=>{${currentContent}}`)(__rtcpl_r__);
      };

export const emit: (code: string) => void = IS_AOT
  ? emptyFn
  : (code) => {
      content += code;
    };

const __rtcpl_aot_fns__: ((args: any[]) => any)[] = [];
let __rtcpl_aot_fn_idx__: number = 0;

/**
 * Setup AOT code
 * @internal
 */
export const __rtcpl_setup_aot__ = (fn: (args: any[]) => any): void => {
  __rtcpl_aot_fns__.push(fn);
};

export const deref: <T>(id: Ref<T>) => T = (id) => __rtcpl_r__[id] as any;
