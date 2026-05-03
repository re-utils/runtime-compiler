import { evaluate as evaluateWithArtifacts } from './artifact.ts';
import { IS_JIT, IS_AOT } from './env/index.ts';
import { emptyFn } from './utils.ts';

export let content = '';

export const evaluate: () => void = IS_JIT
  ? () => {
      content.length > 0 && evaluateWithArtifacts(content);
    }
  : emptyFn;

export const emit: (code: string) => void = IS_AOT
  ? emptyFn
  : (code) => {
      content += code;
    };
