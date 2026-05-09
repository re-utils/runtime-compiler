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

export const parseImports = (
  code: string,
): {
  envImports: ImportStatement;
  globalsImports: ImportStatement;
} => {
  let envImports: ImportStatement | undefined;
  let globalsImports: ImportStatement | undefined;

  for (
    let start = 0, eol = code.indexOf('\n');
    eol > -1 && (envImports == null || globalsImports == null);
    eol = code.indexOf('\n', (start = eol + 1))
  ) {
    if (code.startsWith('import', start)) {
      if (code.endsWith('"runtime-compiler/env";', eol))
        envImports = parseImportBindings(code, start, eol);
      else if (code.endsWith('"runtime-compiler/globals";', eol))
        globalsImports = parseImportBindings(code, start, eol);
    }
  }

  return {
    envImports,
    globalsImports,
  } as any;
};

export default (): Plugin => ({
  name: 'rolldown-plugin-runtime-compiler',
  resolveId: {
    filter: {
      id: /^runtime-compiler\/(?:env|globals)$/,
    },
    handler: () => false,
  },
  renderChunk: async (code, chunk) => {
    if (
      !chunk.imports.includes('runtime-compiler/globals') ||
      !chunk.imports.includes('runtime-compiler/env')
    )
      return null;

    const { envImports, globalsImports } = parseImports(code);
    let aotCode =
      'const __rtcpl_atf__=[],__rtcpl_aot_fns__=[],__rtcpl_setup_aot__=f=>{__rtcpl_aot_fns__.push(f)};let __rtcpl_aot_fn_idx__=0;';

    // Load bindings
    for (let i = 0, { bindings } = envImports; i < bindings.length; i++) {
      const { name, alias } = bindings[i];
      aotCode +=
        name === 'IS_AOT'
          ? `const ${alias}=true;`
          : name === 'IS_BUILD' || name === 'IS_JIT'
            ? `const ${alias}=false;`
            : '';
    }
    for (let i = 0, { bindings } = globalsImports; i < bindings.length; i++) {
      const { name, alias } = bindings[i];
      aotCode +=
        name === 'artifact'
          ? `const ${alias}=i=>__rtcpl_atf__[i];`
          : name === 'emit'
            ? `const ${alias}=()=>{};`
            : name === 'evaluate'
              ? `const ${alias}=()=>{__rtcpl_aot_fns__[__rtcpl_aot_fn_idx__++](__rtcpl_atf__)};`
              : name === 'reserveArtifact'
                ? `const ${alias}=()=>__rtcpl_atf__.push(undefined)-1;`
                : name === 'importArtifact'
                  ? `const ${alias}=v=>__rtcpl_atf__.push(v)-1;`
                  : '';
    }

    // Load built code
    for (let i = 0, codes = await runInWorker(code); i < codes.length; i++)
      aotCode += `__rtcpl_setup_aot__($=>{${codes[i]}});`;

    aotCode +=
      envImports.start < globalsImports.start
        ? code.slice(0, envImports.start) +
          code.slice(envImports.end, globalsImports.start) +
          code.slice(globalsImports.end)
        : code.slice(0, globalsImports.start) +
          code.slice(globalsImports.end, envImports.start) +
          code.slice(envImports.end);

    return {
      code: aotCode,
    };
  },
});
