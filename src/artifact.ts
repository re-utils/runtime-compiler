/**
 * Contain all artifacts.
 */
export const __rtcpl_atf__: unknown[] = [];

export type Artifact<T> = number & {
  '~': T;
};

/* #__NO_SIDE_EFFECTS__ */
export const importArtifact = <T>(value: T): Artifact<T> => (__rtcpl_atf__.push(value) - 1) as any;

/* #__NO_SIDE_EFFECTS__ */
export const reserveArtifact = <T>(): Artifact<T> => (__rtcpl_atf__.push(undefined) - 1) as any;

/**
 * Evaluate content with artifacts injected.
 */
export const evaluate = (content: string): unknown =>
  // @ts-expect-error passing registered artifacts to evaluate.
  ((globalThis.__rtcpl_atf__ = __rtcpl_atf__), (0, eval)(content));
