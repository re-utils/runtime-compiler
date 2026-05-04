import { type Artifact, __rtcpl_atf__ } from './artifact.ts';
import { evaluate as globalEvaluate } from './globals.ts';

import { IS_JIT } from './env/index.ts';

export type ArtifactsRecord = Record<any, Artifact<any>>;
export type ArtifactGroup<T extends ArtifactsRecord> = <K extends keyof T>(k: K) => T[K]['~'];

export const groupArtifacts: <T extends ArtifactsRecord>(o: T) => ArtifactGroup<T> = IS_JIT
  ? (o) => (globalEvaluate(), (k) => __rtcpl_atf__[o[k]])
  : (o) => (k) => __rtcpl_atf__[o[k]];

export const artifact = <T>(id: Artifact<T>): T => __rtcpl_atf__[id] as any;
