import { IS_AOT, IS_BUILD } from './env/index.ts';
import { emptyFn } from './utils.ts';

const refs: unknown[] = [];

export type Ref<T> = number & {
  '~': T;
};

export const importRef = <T>(value: T): Ref<T> => (refs.push(value) - 1) as any;
export const createRef = <T>(): Ref<T> => (refs.push(undefined) - 1) as any;

let content = '';
/**
 * All emitted code.
 * @internal
 */
export let __rtcpl_ct__: string[] = [];

export let evaluate: <T>() => T = IS_AOT
  ? () => __rtcpl_aot_fns__[__rtcpl_aot_fn_idx__++](refs)
  : IS_BUILD
    ? () => {
        __rtcpl_ct__.push(content);

        const currentContent = content;
        content = '';

        if (currentContent.length > 0) return (0, eval)(`$=>{${currentContent}}`)(refs);
      }
    : () => {
        const currentContent = content;
        content = '';

        if (currentContent.length > 0) return (0, eval)(`$=>{${currentContent}}`)(refs);
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

export const deref: <T>(id: Ref<T>) => T = (id) => refs[id] as any;
