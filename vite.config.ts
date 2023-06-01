import path from 'node:path'
import { defineConfig } from 'vite'
import wasmPack from '@jondot/vite-plugin-wasm-pack'
import { wasmPackHmr } from 'vite-wasm-pack-hmr'
import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react'

import manifest from './src/manifest'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    wasmPack(['./rust-wasm']),
    wasmPackHmr() as any,
    react(),
    crx({ manifest }),
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  server: {
    port: 8888,
    strictPort: true,
    hmr: {
      port: 8888,
    },
  },
})
