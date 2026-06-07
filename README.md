# Stark Bank API Exploration

Purpose: a small Firebase Functions project to explore the Stark Bank API and example flows (invoice generation and consumption).

Official API documentation:
- [API | STARK BANK Documentation](https://starkbank.com/docs/api#introduction)

Repository layout
- `functions/` - Firebase Functions project (TypeScript source in `functions/src`, compiled output in `functions/lib`).
- `firebase.json` - Firebase configuration used for local emulators and deployment.
- `package.json` - root dependencies used by utility scripts and examples.

Key folders inside `functions/`
- `functions/src/` - TypeScript source files (services, generators, consumers, validators).
- `functions/lib/` - Transpiled JavaScript produced by `npm run build` (output target for Firebase runtime).

Requirements
- Node.js (use the version targeted by Firebase Functions; configured in `functions/package.json` as `node` 22).
- Firebase CLI (install globally with `npm i -g firebase-tools` or use `npx firebase-tools`).

Install
1. Install root dependencies:

```bash
npm install
```

2. Install function dependencies:

```bash
cd functions
npm install
```

Build
1. Compile TypeScript to JavaScript (writes to `functions/lib`):

```bash
cd functions
npm run build
```

Run locally
- Start the Functions emulator (builds first):

```bash
cd functions
npm run serve
```

Deploy
- Select or add a Firebase project if you haven't already:

```bash
cd functions
firebase use --add
```

- Deploy only functions:

```bash
cd functions
npm run deploy
# or: firebase deploy --only functions
```

Notes
- The TypeScript sources live in `functions/src` and are transpiled to `functions/lib`. Deploys use the compiled code in `functions/lib` (see `functions/package.json` `main` field).
- If you don't have the Firebase CLI installed globally, prefix commands with `npx`, e.g. `npx firebase deploy --only functions`.
- Configure any required environment variables or service account credentials for Stark Bank API usage before running or deploying.
