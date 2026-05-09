import { IS_AOT } from 'runtime-compiler/env';
import { emit, evaluate } from 'runtime-compiler/globals';

import { Type } from 'typebox';
import { Compile, type Validator } from 'typebox/compile';

const User = Type.Script(`{
  name: string,
  password: string
}`);
IS_AOT || emit(Compile(User).Code());
const isUser = evaluate<Validator<{}, typeof User>['Check']>();

console.log(isUser({
  name: 'reve',
  password: 'idk'
}));
