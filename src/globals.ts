import { evaluate as evaluateWithArtifacts } from './artifact.ts';

export let content = '';

export const emit = (code: string): void => {
  content += code;
};

export const evaluate = (): void => {
  evaluateWithArtifacts(content);
};
