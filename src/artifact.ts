/**
 * Contain all artifacts.
 */
export const $: unknown[] = [];

export type Artifact<T> = number & {
  '~': T;
};

/* #__NO_SIDE_EFFECTS__ */
export const importArtifact = <T>(value: T): Artifact<T> => ($.push(value) - 1) as any;

/* #__NO_SIDE_EFFECTS__ */
export const artifact = <T>(a: Artifact<T>): T => $[a] as any;

/* #__NO_SIDE_EFFECTS__ */
export const reserveArtifact = <T>(): Artifact<T> => ($.push(undefined) - 1) as any;

/**
 * Evaluate content with artifacts injected.
 */
export const evaluate = (content: string): unknown =>
  // @ts-expect-error passing registered artifacts to evaluate.
  ((globalThis.__rtcplatf__ = $), (0, eval)('let $=__rtcplatf__;' + content));
