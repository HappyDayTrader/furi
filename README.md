# Project Layout

There are 3 folders, each has it's own GIT repo.

1. furi_node_router
1. furi_npm_module
1. furiapp


## Folder furi_node_router

This is the development environment, code is written in TypeScript 1.8
All development notes found under project's docs folder.

**Important!** Uses Webpack for auto-build & nodemon for testing code changes.

Important: Only file furi.ts should be copied over to the NPM project folder!

## Folder furi_npm_module

This is the project NPM build folder.

## Folder furiapp

This is the NPM test area.

# FURI Test Apps

There are 2 tests app under folder furiapp/

1. `main.js` - Written and ECMAScript 2015
1. `app.ts`  - Written in TS, compile with: tsc app.ts

# FURI NPM Module

The Furi Node module is under folder furi_npm_module

To build a new local NPM zipped module do the following:

Make code updates

```bash
cd furi
rm furi-0.1.0.tgz
tsc
npm pack

cp furi-0.1.0.tgz ../furiapp
```

To test the new module do the following:

```bash
cd furiapp
rm -rf node_modules
npm install furi-0.1.0.tgz
node main.js
```

OR

```bash
tsc app.ts
node app.js
```

## References

* [Webpack](https://webpack.js.org/)
* [Webpack Production build](https://webpack.js.org/guides/production-build/)
* [Webpack Source Map config](https://webpack.js.org/configuration/devtool/)
* [Awesome webpack](https://github.com/webpack-contrib/awesome-webpack#webpack-plugins)
* [TypeScript config](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
* [TypeScript compiler options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
* [TSLint rules](https://palantir.github.io/tslint/rules/)
* [NPM Docs](https://docs.npmjs.com)
* [NPM package.json](https://docs.npmjs.com/files/package.json)

