import { defineManifest } from '@crxjs/vite-plugin'

import pkg from '../package.json'

export default defineManifest({
  manifest_version: 3,
  name: '__MSG_appName__',
  default_locale: 'en',
  description: '__MSG_appDescription__',
  version: pkg.version,
  content_scripts: [
    {
      js: ['src/content-script/index.ts'],
      matches: ['<all_urls>'],
      run_at: 'document_start',
    },
  ],
  background: {
    service_worker: 'src/background/index.ts',
  },
  icons: {
    '16': 'src/assets/images/logo/chrome-16.png',
    '32': 'src/assets/images/logo/chrome-32.png',
    '48': 'src/assets/images/logo/chrome-48.png',
    '128': 'src/assets/images/logo/chrome-128.png',
  },
  action: {
    default_popup: 'index.html',
    default_icon: {
      '16': 'src/assets/images/logo/chrome-16.png',
      '32': 'src/assets/images/logo/chrome-32.png',
      '48': 'src/assets/images/logo/chrome-48.png',
      '128': 'src/assets/images/logo/chrome-128.png',
    },
    default_title: '__MSG_appName__',
  },
  permissions: ['storage', 'unlimitedStorage', 'activeTab'],
  short_name: '__MSG_appName__',
  content_security_policy: {
    extension_pages:
      "script-src 'self' 'wasm-unsafe-eval' http://localhost; object-src 'self';",
  },
  minimum_chrome_version: '88',
})
