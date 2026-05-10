import type { Plugin } from 'rolldown';
import { runInWorker } from './index.ts';

interface ImportBinding {
  name: string;
  alias: string;
}

interface ImportStatement {
  start: number;
  end: number;
  bindings: ImportBinding[];
}

const parseImportBindings = (code: string, start: number, end: number): ImportStatement => {
  const startSpecs = code.indexOf('{', start);
  const endSpecs = code.lastIndexOf('}', end);
  if (start === -1 && end === -1) throw new Error('Only named imports replacement is supported!');

  const bindings: ImportBinding[] = [];
  for (
    let i = 0, specifiers = code.slice(startSpecs + 1, endSpecs - 1).split(',');
    i < specifiers.length;
    i++
  ) {
    const specifier = specifiers[i].trim();
    if (specifier === '') continue;

    const parts = specifier.split(' as ', 2);

    if (parts.length === 1) {
      const name = parts[0].trim();
      bindings.push({
        name,
        alias: name,
      });
    } else
      bindings.push({
        name: parts[0].trim(),
        alias: parts[1].trim(),
      });
  }
  return {
    bindings,
    start,
    end,
  };
};

export default (): Plugin => ({
  name: 'rolldown-plugin-runtime-compiler',
  resolveId: {
    filter: {
      id: /^runtime-compiler\/(?:env|globals)$/,
    },
    handler: () => false,
  },
  renderChunk: async (code, { imports }) => {
    // Replace 'runtime-compiler/globals' and 'runtime-compiler/env' import
    // with their equivalent in AOT mode
    // Also run the module in build mode and insert the result to the final code

    const globalsImportIdx = imports.indexOf('runtime-compiler/globals');
    if (globalsImportIdx === -1) return null;
    imports.splice(globalsImportIdx);

    const envImportIdx = imports.indexOf('runtime-compiler/env');

    // Resolve import statements
    let envImport: ImportStatement = null as any;
    let globalsImport: ImportStatement = null as any;

    if (envImportIdx === -1)
      envImport = {
        bindings: [],
        start: 0,
        end: 0,
      };
    else imports.splice(envImportIdx, 1);

    for (
      let start = 0, eol = code.indexOf('\n');
      // Run until both imports are resolved
      eol > -1 && (envImport == null || globalsImport == null);
      eol = code.indexOf('\n', (start = eol + 1))
    ) {
      if (code.startsWith('import', start)) {
        if (code.endsWith('"runtime-compiler/env";', eol))
          envImport = parseImportBindings(code, start, eol);
        else if (code.endsWith('"runtime-compiler/globals";', eol))
          globalsImport = parseImportBindings(code, start, eol);
      }
    }

    let aotCode = 'const __rtcpl_r__=[],__rtcpl_aot_fns__=[';

    // Load built code
    for (let codes = await runInWorker(code), i = codes.length - 1; i > -1; i--)
      aotCode += `$=>{${codes[i]}},`;
    aotCode += ']';

    // Load bindings
    for (let i = 0, { bindings } = envImport; i < bindings.length; i++) {
      const { name, alias } = bindings[i];
      aotCode +=
        name === 'IS_AOT'
          ? `,${alias}=true`
          : name === 'IS_BUILD' || name === 'IS_JIT'
            ? `,${alias}=false`
            : '';
    }
    for (let i = 0, { bindings } = globalsImport; i < bindings.length; i++) {
      const { name, alias } = bindings[i];
      aotCode +=
        name === 'deref'
          ? `,${alias}=i=>__rtcpl_r__[i]`
          : name === 'evaluate'
            ? `,${alias}=(_)=>__rtcpl_aot_fns__.pop()(__rtcpl_r__)`
            : name === 'createRef'
              ? `,${alias}=()=>__rtcpl_r__.push(undefined)-1`
              : name === 'importRef'
                ? `,${alias}=v=>__rtcpl_r__.push(v)-1`
                : '';
    }

    // Remove /env and /globals import
    aotCode +=
      ';' +
      (envImport.start < globalsImport.start
        ? code.slice(0, envImport.start) +
          code.slice(envImport.end, globalsImport.start) +
          code.slice(globalsImport.end)
        : code.slice(0, globalsImport.start) +
          code.slice(globalsImport.end, envImport.start) +
          code.slice(envImport.end));

    return {
      code: aotCode,
    };
  },
});
