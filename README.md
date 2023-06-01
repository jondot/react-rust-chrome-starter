# react-rust-chrome

Chrome extension template with **Rust** :crab: and **React** using:

* Typescript
* React
* Rust (WASM), with [yew](https://yew.rs/) as an option
* tailwind and [shadcn](https://ui.shadcn.com/) for UI components
* Vite
* [crxjs](https://crxjs.dev/) for extension development

## What is this good for?

Mostly for projects where you want:

* The vast majority of logic and interop with Chrome done with Rust
* Just a thin layer of UI (in React) calling out to the Rust WASM module for all logic and workflow.
* All chrome extension config and build workflow done with Vite and Typescript for productivity

## Install

```bash
pnpm install
cargo install wasm-pack
cd rust-wasm && wasm-pack build --target web
```

__What did we just do?__

* Installed node deps
* Install `wasm-pack` which will build our Rust parts
* We perform an initial build with cargo for the Rust/WASM material

__Whats next?__

Review the [manifest](src/manifest.ts) and personalize the extension. Look for `__MSG_`, update icon and logo and other details.


## Development

```bash
pnpm dev
```

>**note**: Most development is done live with HMR, which crxjs provides (no need to refresh the extension manually in Chrome). Except for the development of the background script which needs a manual tweak, for details see comments in [src/background/index.ts](src/background/index.ts).

## Build

```bash
pnpm build
```

Your fully built extension is in `dist/`

