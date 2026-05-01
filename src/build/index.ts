import type { Artifact } from '../artifact.ts';

/**
 * A group of artifacts.
 */
export type Artifacts = Record<any, Artifact<any>>;

/**
 * Infer type for an artifact group
 */
export type InferArtifacts<T extends Artifacts> = {
  [K in keyof T]: T[K]['~'];
};

export const moduleTypes = (modulePath: string): string => (
  (modulePath = JSON.stringify(modulePath)),
  `import type T from${
    modulePath
  };import type{InferArtifacts}from"runtime-compiler/build";export * from${
    modulePath
  };declare const artifacts:InferArtifacts<T>;export default artifacts;`
);
