import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { existsSync } from 'node:fs';

import { moduleTypes } from './index.ts';

let curRes: () => void, curRej: () => void;
const getPromiseResolvers = (res: any, rej: any) => {
  curRes = res;
  curRej = rej;
};

export const config: {
  hash: (str: string) => string;
} = {
  hash: (str) => {
    let res = 0;
    for (let i = 0; i < str.length; i++) res = (res << 5) - res + str.charCodeAt(0);
    return res.toString(16);
  },
};

export const buildModule = async (
  buildDir: string,
  mod: string,
  outputFile: string,
): Promise<any> => {
  const buildFile = path.join(buildDir, config.hash(mod) + '.js');

  if (!existsSync(buildFile)) {
    const modImport = JSON.stringify(mod);

    await writeFile(
      buildFile,
      `import{writeFileSync as w}from"node:fs";import"runtime-compiler/env/build";import a from${
        modImport
      };import{content as c}from'runtime-compiler/globals';let s=\`import"runtime-compiler/env/aot";import{$}from'runtime-compiler/artifact';export * from${
        modImport
      };\${c}export default{\`;for(let k in a)s+=JSON.stringify(k)+\`:$[\${a[k]}],\`;w(${JSON.stringify(outputFile)},s+"}");postMessage()`,
    );
  }

  // Run the builder in a worker
  const promise = new Promise<any>(getPromiseResolvers);

  const worker = new Worker(buildFile);
  worker.onmessage = curRes;
  worker.onerror = curRej;

  return promise;
};

export const buildModuleTypes = (mod: string, outputFile: string): true | Promise<void> =>
  existsSync(outputFile) || writeFile(outputFile, moduleTypes(mod));
