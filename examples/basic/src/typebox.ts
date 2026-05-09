import { IS_AOT } from 'runtime-compiler/env';
import { emit, evaluate, importRef } from 'runtime-compiler/globals';

import { Type, type Static, type TSchema } from 'typebox';
import { Build } from 'typebox/schema';

const compile = <T extends TSchema>(schema: T): (input: unknown) => input is Static<T> => {
  const result = Build({}, schema);
  const external = result.External();

  IS_AOT || emit(`{const ${external.identifier}=$[${importRef(external.variables)}];${result.Functions().join(';')};return(value)=>${result.Entry()}}`);
  return evaluate();
}

const fn = compile(Type.String({ pattern: /abc/ }));
console.log(fn('abc'));
