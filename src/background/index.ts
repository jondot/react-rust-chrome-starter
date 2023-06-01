import init, { analyze_tabs } from 'rust-wasm'

// this will not resolve in live edit hmr mode. we have to rebuild the extension and reload manually for
// URLs to properly resolve
import wasm from '../../rust-wasm/pkg/rust_wasm_bg.wasm?url'

// 
// Instead of the above, you can uncomment the following to use 
// livereload, but remember to remove this when building for production
// const wasm = 'http://localhost:8888/assets/rust_wasm_bg.wasm'

init(wasm).then(() => {
  console.log('background')
  return analyze_tabs()
})
