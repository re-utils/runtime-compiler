import { IS_AOT, IS_BUILD } from './env/index.ts';
import { emptyFn } from './utils.ts';

const __rtcpl_atf__: unknown[] = [];

export type Artifact<T> = number & {
  '~': T;
};

/* #__NO_SIDE_EFFECTS__ */
export const importArtifact = <T>(value: T): Artifact<T> => (__rtcpl_atf__.push(value) - 1) as any;

/* #__NO_SIDE_EFFECTS__ */
export const reserveArtifact = <T>(): Artifact<T> => (__rtcpl_atf__.push(undefined) - 1) as any;

let content = '';
/**
 * All emitted code.
 * @internal
 */
export let __rtcpl_ct__: string[] = [];

export let evaluate: <T>() => T = IS_AOT
  ? () => __rtcpl_aot_fns__[__rtcpl_aot_fn_idx__++](__rtcpl_atf__)
  : IS_BUILD
    ? () => {
        __rtcpl_ct__.push(content);

        const currentContent = content;
        content = '';

        if (currentContent.length > 0) return (0, eval)(`$=>{${currentContent}}`)(__rtcpl_atf__);
      }
    : () => {
        const currentContent = content;
        content = '';

        if (currentContent.length > 0) return (0, eval)(`$=>{${currentContent}}`)(__rtcpl_atf__);
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

// Access artifacts
export type ArtifactsRecord = Record<any, Artifact<any>>;
export type ArtifactGroup<T extends ArtifactsRecord> = <K extends keyof T>(k: K) => T[K]['~'];

export const artifact: <T>(id: Artifact<T>) => T = (id) => __rtcpl_atf__[id] as any;
