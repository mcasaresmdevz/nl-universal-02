# Creating your own NLC Polyglot Monorepo

First add a `.gitignore` file at the root of your project

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Diagnostic reports (https://nodejs.org/api/report.html)
report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage
*.lcov

# nyc test coverage
.nyc_output

# Grunt intermediate storage (https://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# TypeScript v1 declaration files
typings/

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env
.env.test

# parcel-bundler cache (https://parceljs.org/)
.cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt

# Gatsby files
.cache/
# Comment in the public line in if your project uses Gatsby and *not* Next.js
# https://nextjs.org/blog/next-9-1#public-directory-support
# public

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port
```

## Github Actions workflows

Create a `.github/workflows/main.yml` file.

This is a configuration file for GitHub Actions, which is a continuous integration and continuous deployment (CI/CD) platform provided by GitHub. It defines a workflow that is triggered when code is pushed to the main branch of a repository. The workflow has two jobs, "build" and "publish", which respectively build the code and publish it as a Node.js package to GitHub's package registry. The workflow is designed to ensure that the code builds and passes tests before it is published, which helps ensure the quality of the published package.

```
name: Netspective Labs Commons

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          path: nodejs/universal
          node-version: 16
      - run: cd nodejs/universal && npm ci
      - run: cd nodejs/universal && npm test

  publish-universal:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      packages: write
      contents: read
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          path: nodejs/universal
          node-version: 16
          registry-url: https://npm.pkg.github.com/
      - run: cd nodejs/universal && echo "//npm.pkg.github.com/:_authToken=${{ secrets.NPM_TOKEN }}" >> .npmrc
      - run: cd nodejs/universal && npm ci
      - run: cd nodejs/universal && npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}

  publish-astro:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      packages: write
      contents: read
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          path: nodejs/astro
          node-version: 16
          registry-url: https://npm.pkg.github.com/
      - run: cd nodejs/astro && echo "//npm.pkg.github.com/:_authToken=${{ secrets.NPM_TOKEN }}" >> .npmrc
      - run: cd nodejs/astro && npm ci
      - run: cd nodejs/astro && npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

This workflow includes two additional jobs in addition to the `build` job. These jobs are responsible for publishing the `nodejs/universal` and `nodejs/astro` packages, respectively. Let's start by looking at the job for the `astro` package.

## <a name="astro_package_creation"></a>Astro package creation

If you don't have a `nodejs` directory in your project's _root_ directory, you'll need to create one.

Inside the `nodejs` directory, create a directory named `astro`. This `astro` directory will contain the contents of the `astro` package.

To get started, add the files that should be located at the root level of the `astro` folder.

- package.json

```
{
  "name": "@mcasaresmdevz/nlc-astro",
  "version": "0.0.1",
  "description": "A library with astro components and layouts",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "type": "module",
  "files": [
    "dist/*",
    "src/*",
    "!src/**/*.spec.ts"
  ],
  "repository": {
    "type": "git",
    "url": "git+https://github.com/mcasaresmdevz/nl-universal-02/nlc-astro.git"
  },
  "keywords": [
    "library",
    "typescript"
  ],
  "dependencies": {},
  "devDependencies": {
    "typescript": "^4.9.5"
  },
  "scripts": {
    "cp-astro-components": "cp -r src/components dist",
    "build": "rm -rf dist && mkdir dist && npm run cp-astro-components && tsc",
    "upgrade-major": "npm version major",
    "upgrade-minor": "npm version minor",
    "upgrade-patch": "npm version patch",
    "test": "exit 0"
  },
  "author": "",
  "license": "MIT"
}
```

After you added the `package.json`, run

```
npm install
```

This will create the `package-lock.json` file.

- tsconfig.json

```
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "allowJs": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "nodenext"
  },
  "include": ["./src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts", "**/*.spec.tsx", "**/*.test.tsx"]
}

```

- .npmrc

```
@OWNER:registry=https://npm.pkg.github.com
```

Replace the _OWNER_ namespace with the owner of the repo or organization.

- .npmignore

```
# Ignore source files and development files
src/
*.ts
*.tsx
*.map
*.d.ts
*.spec.ts
*.spec.tsx
*.test.ts
*.test.tsx
jest.config.js
tsconfig.json

# Ignore version control files
.gitignore
.git/
*/.gitignore

# Ignore editor-specific files
.vscode/
.idea/
*.sublime-*
*.swp
.DS_Store
```

Now we just need to add a component inside a new `src/components` directory that you should create.

For example, we will create the `ActionItem.astro`

```
---
export interface Props {
  readonly assignee: string;
}
const { assignee } = Astro.props;
---
<mark>[<b>{ assignee }</b>] <slot /></mark>
```

Lastly, we need to create the entrypoint for the package, that is the `index.ts`. This file should be inside `src`. Here we will export all the components that we want to _expose_ to our package consumers.

```
// @ts-ignore
export { default as ActionItem } from './components/ActionItem.astro';
```

# Package authentication

We will need to be authenticated with a proper Github _Personal Access Token (PAT)_ in order to be able to deploy. So create a PAT with all permissions, if you don't know how to here's a [guide for you](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

## Adding the PAT to Secrets in the Monorepo

Once you have the PAT, we will need to add it to the _secrets_ of the repo. Follow these steps to achieve this:

- Go to the repo in Github.
- Click on _Settings_.
- Click on _Secrets and variables_ on the left sidebar.
- Click on _Actions_.
- _New repository secret_

The name should be

```
NPM_TOKEN
```

and the value would be the PAT you've created earlier.

The name of the secret _should match_ the name of the property accessed by the _secrets_ object in the `.github/workflows/main.yml` file.

```
echo "//npm.pkg.github.com/:_authToken=${{ secrets.NPM_TOKEN }}" >> .npmrc
```

```
NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

# Using the packages

## Creating an .npmrc file

In the root of the project that you wish to install a `nodejs` package, add a `.npmrc` file with this content

```
@OWNER:registry=https://npm.pkg.github.com
```

Replace the _OWNER_ namespace with the owner of the repo or organization.

The purpose of this file is to configure the npm client to _use GitHub's package registry_ as the default registry for _installing_ and _publishing packages_. This is typically used to install or publish private packages hosted on GitHub's package registry.

## Install the package

Let's use as an example the `astro package` that we've already created [here](#astro_package_creation).

The command to install the package may vary on the owner of the repo.

```
pnpm install @OWNER/nlc-astro
```

Once again replace the _OWNER_ namespace with the owner of the repo or organization.

## Deploying packages

In order to deploy a new version of a package you would just need to upgrade the version of it by running one of these commands first at the _root_ of the package. It's important that you follow the [semantic versioning standards](https://docs.npmjs.com/about-semantic-versioning).

```
npm run upgrade-major
```

```
npm run upgrade-minor
```

```
npm run upgrade-patch
```

Then commit your work and push.

```
git push
```

This will trigger the _Github Action_ and will deploy your package automatically. You can check the _Actions_ tab in the repository and see the progress of the workflows if you want.
