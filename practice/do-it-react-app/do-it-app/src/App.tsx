import {useClock} from './hooks/useClock'
import ArrayState from './pages/ArrayState'
import Callback from './pages/Callback'
import ClickTest from './pages/ClickTest'
import Clock from './pages/Clock'
import FileDrop from './pages/FileDrop'
import Memo from './pages/Memo'
import RadioInputTest from './pages/RadioInputTest'

function App() {
  const today = useClock()

  return (
    <>
      <Clock today={today} />
      <FileDrop />
      <ClickTest />
      <ArrayState />
      <RadioInputTest />
      <Callback />
      <Memo />
    </>
  )
}

export default App
