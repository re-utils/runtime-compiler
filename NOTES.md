```ts
const globalScope = scopeInit();

export default build({
  scope: globalScope,
  artifacts: {
    app: build(globalScope)
  }
});
```
