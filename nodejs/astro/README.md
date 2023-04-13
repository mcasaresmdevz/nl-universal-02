# How to use the library

First you will need a Personal Access Token (PAT), in order to create it, follow these steps.

Go to Github account settings and select "Developer settings" > "Personal access tokens".

Click on "Generate new token".

Give your token a name and select the permissions listed:

- repo
- workflow
- packages
- gist
- notifications
- project

Click on "Generate token" and copy the token or save it in a notepad temporarily so you don't lose it.

## Creating an Astro project

Install the `Astro CLI` by running the following command in your terminal:

```
npm install -g astro
```

Run the following command to create a new Astro project:

```
pnpm create astro@latest
```

If you don't have `pnpm` installed globally in your computer run this command and the previous one again (you may need to close and open a new terminal after the `pnpm` installation)

```
npm i -g pnpm
```

Navigate to the project directory:

```
cd my-project
```

You will also need to add this to the `astro.config.mjs` file:

```
export default defineConfig({
  vite: {
    ssr: {
      noExternal: ['@mcasaresmdevz/netspective-universal-lib-0.1'],
    },
  },
});
```

Run the following command to install the project dependencies:

```
pnpm install
```

Run the following command to start the development server:

```
npm run dev
```

Open your web browser and navigate to http://localhost:3000 to see your `Astro` project running.

## .npmrc file

Then you will need to create an `.npmrc` file in the root of your `Astro` project:

```
//npm.pkg.github.com/:_authToken=TOKEN_VALUE
@mcasaresmdevz:registry=https://npm.pkg.github.com
```

```
pnpm install @mcasaresmdevz/netspective-universal-lib-0.1
```

# How to maintain the library

## Project structure

```
├── .github                                  # GitHub-specific configuration files for the project.
├── dist                                     # compiled files generated after running the build command.
├── package.json                             # project metadata and dependencies information.
├── pnpm-lock.yaml                           # information about the installed packages and their dependencies.
├── README.md                                # the documentation for the project.
├── src
│   ├── components                           # contains the reusable components used in the project.
│   │   ├── ActionItem.astro
│   │   ├── AGGrid.web.d.ts
│   │   ├── AGGrid.web.js
│   │   ├── ApacheEcharts.web.d.ts
│   │   ├── ApacheEcharts.web.js
│   │   ├── ChartJS.web.js
│   │   ├── DiagramsNet.web.js
│   │   ├── KrokiDiagram.web.js
│   │   ├── MarkmapDiagram.web.js
│   │   ├── Readability.web.js
│   │   ├── TimeAgo.web.js
│   │   ├── TimeDurationNarrative.web.js
│   │   └── WordCount.web.js
│   ├── env.d.ts                            # type definitions for environment variables used in the project
│   ├── index.ts                            # the main entry point for the application
│   └── lib                                 # utility functions used in the project
│       ├── detect-route.ts
│       ├── drizzle-aide.ts
│       ├── foreign-content.ts
│       ├── fs.ts
│       ├── fs-walk.ts
│       ├── health.ts
│       ├── human.ts
│       ├── interpolate.ts
│       ├── knowledge.ts
│       ├── memoize-api.ts
│       ├── memoize-foreign-content.ts
│       ├── memoize.ts
│       ├── open-graph.ts
│       ├── pg-conn.ts
│       ├── pg-gitlab-cms.ts
│       ├── README.md
│       ├── remark-chart.ts
│       ├── remark-diagram.ts
│       ├── remark-reading-time.ts
│       ├── remark-rewrite-links.ts
│       ├── remark-rewrite-previewable-url.ts
│       ├── remark-validate-resources.ts
│       ├── slug.ts
│       ├── tree-pathway.ts
│       ├── tree.ts
│       └── workspace.ts
└── tsconfig.json                           # TypeScript compiler configuration for the project
```

## Deploying package

We use `Github Actions` as our CI/CD tool, you can check `.github/workflows/main.yml` for more info there. Github will automatically deploy a new version of the package as soon as someone pushes a commit with a _new version_ in the `package.json`.

We recommend you to read this [semantic-versioning](https://docs.npmjs.com/about-semantic-versioning)
docs if you are not aware already of it.

To update the version, you can run the following commands, depending on whether the update is _major_, _minor_, or _patch_.

```
npm run upgrade-major
```

```
npm run upgrade-minor
```

```
npm run upgrade-patch
```

Once you upgraded the package version, you can now push:

```
git push
```

This will push your latest changes to the Github repository and trigger the Github action that deploys the package.
You can check this in the _Actions_ tab in the Github repository.
