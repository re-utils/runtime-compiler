import type { Plugin, PluginContext } from 'rolldown';
import { runInWorker, compile } from './build.ts';

/**
 * @internal
 */
export interface ImportBinding {
  name: string;
  alias: string;
}

/**
 * @internal
 */
export interface ImportStatement {
  start: number;
  end: number;
  bindings: ImportBinding[];
}

/**
 * @internal
 */
export const parseImportBindings = (code: string, start: number, end: number): ImportStatement => {
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

const EMPTY_IMPORT: ImportStatement = {
  bindings: [],
  start: 0,
  end: 0,
};

type RenderChunk = Exclude<Plugin['renderChunk'] & {}, (...args: any[]) => any>;

export default (
  options: {
    /**
     * Function to check whether this external dependency uses `runtime-compiler` without bundling.
     */
    useLoader?: (importName: string) => boolean;

    /**
     * Choose what chunk to run `renderChunk`.
     */
    filter?: RenderChunk['filter'];

    /**
     * Choose the order to run `renderChunk`.
     */
    order?: RenderChunk['order'];
  } = {},
): Plugin =>
  ({
    name: 'rolldown-plugin-runtime-compiler',
    resolveId: {
      filter: {
        id: /^runtime-compiler\/(?:env|globals|nobuild)$/,
      },
      handler: () => false,
    },
    renderChunk: {
      filter: options.filter,
      order: options.order,

      // Replace 'runtime-compiler/globals' and 'runtime-compiler/env' import
      // with their equivalent in AOT mode
      // Also run the module in build mode and insert the result to the final code
      async handler(code, chunk) {
        const { imports } = chunk,
          useLoader = options.useLoader && imports.some(options.useLoader);

        let envImport: ImportStatement = null as any;
        {
          const envImportIdx = imports.indexOf('runtime-compiler/env');
          if (envImportIdx === -1) envImport = EMPTY_IMPORT;
          else imports.splice(envImportIdx, 1);
        }

        let globalsImport: ImportStatement = null as any;
        if (useLoader) globalsImport = EMPTY_IMPORT;
        else {
          const globalsImportIdx = imports.indexOf('runtime-compiler/globals');
          if (globalsImportIdx === -1) {
            if (envImport === EMPTY_IMPORT) return null;
            globalsImport = EMPTY_IMPORT;
          } else imports.splice(globalsImportIdx);
        }

        for (
          let start = 0, eol = code.indexOf('\n');
          // Run until both imports are resolved
          eol > -1 && (envImport == null || globalsImport == null);
          eol = code.indexOf('\n', (start = eol + 1))
        )
          if (code.startsWith('import', start)) {
            if (envImport == null && code.endsWith('"runtime-compiler/env";', eol))
              envImport = parseImportBindings(code, start, eol);
            else if (globalsImport == null && code.endsWith('"runtime-compiler/globals";', eol))
              globalsImport = parseImportBindings(code, start, eol);
          }

        const codes = await runInWorker(code);
        if (useLoader) {
          const fileName = chunk.fileName + '-rtc-aot-loader.js';
          this.emitFile({
            type: 'prebuilt-chunk',
            code: compile(codes),
            fileName,
          });
          let aotCode = 'import' + JSON.stringify(fileName) + ';';

          // Load bindings
          for (let i = 0, { bindings } = envImport; i < bindings.length; i++) {
            const { name, alias } = bindings[i];
            aotCode +=
              name === 'IS_AOT'
                ? `const ${alias}=true;`
                : name === 'IS_BUILD' || name === 'IS_JIT'
                  ? `const ${alias}=false;`
                  : '';
          }

          return aotCode + code.slice(0, envImport.start) + code.slice(envImport.end);
        } else {
          // Load built code
          let aotCode = `const __rtcpl_r__=[],__rtcpl_aot_fns__=[${codes}]`;

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
                  ? `,${alias}=_=>__rtcpl_aot_fns__.pop()(__rtcpl_r__)`
                  : name === 'evaluateAsync'
                    ? `,${alias}=async _=>__rtcpl_aot_fns__.pop()(__rtcpl_r__)`
                    : name === 'createRef'
                      ? `,${alias}=()=>__rtcpl_r__.push(undefined)-1`
                      : name === 'ref'
                        ? `,${alias}=v=>__rtcpl_r__.push(v)-1`
                        : '';
          }

          // Remove /env and /globals import
          return (
            aotCode +
            ';' +
            (envImport.start < globalsImport.start
              ? code.slice(0, envImport.start) +
                code.slice(envImport.end, globalsImport.start) +
                code.slice(globalsImport.end)
              : code.slice(0, globalsImport.start) +
                code.slice(globalsImport.end, envImport.start) +
                code.slice(envImport.end))
          );
        }
      },
    },
  }) as Plugin;
