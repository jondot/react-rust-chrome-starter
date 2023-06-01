/* eslint-disable no-console */
import { analyze_tabs } from 'rust-wasm'
import { Button } from '../components/ui/button'

export const App = () => {
  return (
    <div className="bg-slate-500">
      hello
      <Button
        onClick={async () => {
          console.log('tabs', await analyze_tabs())
        }}
      >
        Click
      </Button>
    </div>
  )
}
