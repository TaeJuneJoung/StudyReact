import {useClock} from './hooks/useClock'
import Callback from './pages/Callback'
import Clock from './pages/Clock'
import Memo from './pages/Memo'
import NumberState from './pages/NumberState'
import RadioInputTest from './pages/RadioInputTest'

function App() {
  const today = useClock()

  return (
    <>
      <Clock today={today} />
      <NumberState />
      <RadioInputTest />
      <Callback />
      <Memo />
    </>
  )
}

export default App
