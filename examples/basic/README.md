```sh
# Build the package
bun task build

# Dev mode doesn't require build
bun src/index.ts

# Prod build
bun rolldown -c rolldown.config.mjs
```
