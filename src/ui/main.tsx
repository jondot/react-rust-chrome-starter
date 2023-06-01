/* eslint-disable no-console */
import ReactDOM from 'react-dom/client'
import './index.css'
import init from 'rust-wasm'
import { App } from '@/ui/app'

init()
  .then(() => {
    console.log('foreground')
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <App />
    )
  })
  .catch(console.log)
