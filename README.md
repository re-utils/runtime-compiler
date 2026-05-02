A code generation system.

# Code generation
Code generation is a trick used in a lot of high performance libraries, especially schema validators (TypeBox, Ajv, Sury, ...).
```ts
const schema = {
  id: t.string,
  pwd: t.string
};

// Can be compiled to a fast check function
const check = (0, eval)(`
  (d) => typeof d === 'object'
    && d !== null
    && typeof d.id === 'string'
    && typeof d.pwd === 'string'
`);
```

Backend frameworks like Elysia also use it to optimize their request handling:
```ts
// Not exactly what Elysia generates but u get the idea
switch (path) {
  case '/': return handleHome();
  case '/user': {
    // Calls can be analyzed to remove
    // unused fields in the context object
    const c = { ... };

    // Inline hook calls
    onRequestHook(c);
    handleRequest(c);
    afterRequestHook(c);

    return sendResponse(c);
  }
}
```

For cases that code generation works, it is usually much easier to write and setup than AST transformations, compiles faster, and also has more flexibility.

The output startup cost is higher than AST transformations though, but this library has primitives to minimize that additional cost.

## Writing codegen
The first example was pretty simple, but what if we want to use an user-defined value?
```ts
const check = (0, eval)(`
  (d) => typeof d === 'string' && checkEmail(d)
`);
```

This works but it breaks with closures (similarly for other types of unserializable data):
```ts
import { checkEmail } from './utils.ts';

// eval returns the value of the last statement
const check = (0, eval)(`
  const checkEmail = ${checkEmail.toString()};
  (d) => typeof d === 'string' && checkEmail(d)
`);

// For a checkEmail function like this it would
// break as emailRegex is not available in eval scope
const emailRegex = /.../;
const checkEmail = (str: string) => emailRegex.test(str);
```

We gonna need a dependency array to inject user-defined values into the eval scope:
```ts
import { checkEmail } from './utils.ts';

const buildCheck = (0, eval)(`(deps) => {
  const checkEmail = deps[0];
  return (d) => typeof d === 'string' && checkEmail(d)
}`);

const check = buildCheck([checkEmail]);
```

## Problems
Code generation has 2 main problems:
- It has a startup time, memory usage and bundle size cost.
- It does not work on certain runtimes.

This library merges all `eval()` calls into 1 (which makes it able to do ahead of time compilation) and make compiled values easier to work with.
```ts
const check1 = compile(schema1);
const check2 = compile(schema2);

// Can be rewritten as
const check1Id = compile(schema1);
const check2Id = compile(schema2);

// For ahead-of-time compilation to work
// this evaluate() call can just be replaced with
// whatever code is generated at the moment
evaluate();

const check1 = artifact(check1Id);
const check2 = artifact(check2Id);
```

The ahead of time output can be:
```js
// Store dependencies and build outputs
const check1Id = compile(schema1);
const check2Id = compile(schema2);

$[0] = (d) => typeof d === 'string';
$[1] = (d) => Number.isInteger(d) && d > -1 && d < 256;

const check1 = artifact(check1Id);
const check2 = artifact(check2Id);
```

We can remove the codegen cost with flags:
```ts
const compile = IS_AOT
  // This is the compile() function after build, since
  // we don't need to codegen anymore
  ? () => reserveArtifact()
  : (schema1) => {
    ...;
    const schemaId = reserveArtifact();
    emit(`$[${schemaId}]=${builtFnCode}`);
    return schemaId;
  }
```
