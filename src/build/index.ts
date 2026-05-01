import type { Artifact } from '../artifact.ts';

/**
 * A group of artifacts.
 */
export type Artifacts = Record<any, Artifact<any>>;

/**
 * Infer type for an artifact group.
 */
export type InferArtifacts<T extends Artifacts> = {
  [K in keyof T]: T[K]['~'];
};

export const moduleTypes = (modulePath: string): string => (
  (modulePath = JSON.stringify(modulePath)),
  `import T from${
    modulePath
  };import{InferArtifacts}from"runtime-compiler/build";export * from${
    modulePath
  };var artifacts:InferArtifacts<typeof T>;export default artifacts;`
);
