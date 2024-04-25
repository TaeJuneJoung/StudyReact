import {useClock} from './hooks/useClock'
import Callback from './pages/Callback'
import Clock from './pages/Clock'
import InputTest from './pages/InputTest'
import Memo from './pages/Memo'
import NumberState from './pages/NumberState'

function App() {
  const today = useClock()

  return (
    <>
      <Clock today={today} />
      <NumberState />
      <InputTest />
      <Callback />
      <Memo />
    </>
  )
}

export default App
