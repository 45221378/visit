import { render } from 'react-dom'
import '/common/reset.css'
import './init-anti.css'
import setConsole from '/common/setConsole'

const root = document.getElementById('root') as HTMLElement
async function setup() {
  await setConsole()
}

setup()
  .then(async () => {
    const { default: App } = await import('./App')
    render(<App />, root)
  })
  .catch((err) => {
    console.log(err)
    render(<div>{(err as Error).message}</div>, root)
  })
