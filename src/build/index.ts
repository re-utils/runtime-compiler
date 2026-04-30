import type { Artifact } from '../artifact.ts';
import { content } from '../globals.ts';

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

/**
 * Build module content.
 *
 * Only 1 module should be built at a time.
 *
 * @example
 * import 'runtime-compiler/env/build';
 *
 * // This step is cacheable for all modes.
 * buildSync({
 *   input: './main.ts',
 *   output: {
 *     file: './main.js'
 *   },
 *   externals: ['runtime-compiler/env']
 * });
 *
 * writeFileSync('./out.js', await buildAOTModule('./main.js'));
 */
export const buildAOTModule = async (mod: string): Promise<string> => {
  const artifacts: Artifacts = (await import(mod)).default;

  let str = `import"runtime-compiler/env/loader/aot";import{$}from'runtime-compiler/artifacts';export * from${JSON.stringify(mod)};${content}export default{`;
  for (const key in artifacts) str += JSON.stringify(key) + `:$[${artifacts[key]}],`;

  return str + '}';
};
