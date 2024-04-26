import {useClock} from './hooks/useClock'
import ArrayState from './pages/ArrayState'
import Callback from './pages/Callback'
import Clock from './pages/Clock'
import Memo from './pages/Memo'
import RadioInputTest from './pages/RadioInputTest'

function App() {
  const today = useClock()

  return (
    <>
      <Clock today={today} />
      <ArrayState />
      <RadioInputTest />
      <Callback />
      <Memo />
    </>
  )
}

export default App
