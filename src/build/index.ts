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
  };import{InferArtifacts as I}from"runtime-compiler/build";export * from${
    modulePath
  };var a:I<typeof T>;export default a;`
);

export const jitModule = (mod: string): string => (
  (mod = JSON.stringify(mod)),
  `import{evaluate as e}from"runtime-compiler/globals";import a from${
    mod
  };import{$}from"runtime-compiler/artifact";export * from${
    mod
  };e();var b={...a};for(let k in b)b[k]=$[b[k]];export default b`
);

export const aotModuleBuilder = (mod: string): string => (
  (mod = JSON.stringify(mod)),
  `import"runtime-compiler/env/build";import a from${
    mod
  };import{content as c}from"runtime-compiler/globals";let s=\`import"runtime-compiler/env/aot";import{$}from"runtime-compiler/artifact";export * from${
    mod
  };\${c}export default{\`;for(let k in a)s+=JSON.stringify(k)+\`:$[\${a[k]}],\`;s+="}";`
);
