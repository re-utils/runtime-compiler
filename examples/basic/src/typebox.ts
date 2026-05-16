import { IS_AOT, IS_BUILD } from 'runtime-compiler/env';
import { evaluate, ref } from 'runtime-compiler';

import { Type, type Static } from 'typebox';
import { Build, type XSchema } from 'typebox/schema';

const compile = <T extends XSchema>(schema: T): ((input: unknown) => input is Static<T>) => {
  const result = Build({}, schema);

  const external = result.External();
  const externalRef = ref(external.variables);

  return evaluate(
    IS_AOT ||
      `const ${external.identifier}=$[${externalRef}];${result.Functions().join(';')};return value=>${result.Entry()}`,
  );
};

const fn = compile(Type.String({ pattern: /abc/ }));
const fn1 = compile(Type.Refine({}, (value) => typeof value === 'string'));

if (!IS_BUILD) {
  console.log(fn('abc'));
  console.log(fn1('abc'));
}
