import {useClock} from './hooks/useClock'
import ArrayState from './pages/ArrayState'
import Callback from './pages/Callback'
import Clock from './pages/Clock'
import FileDrop from './pages/FileDrop'
import ForwardRefTest from './pages/ForwardRefTest'
import Memo from './pages/Memo'
import RadioInputTest from './pages/RadioInputTest'
import ValidatableInputTest from './pages/ValidatableInputTest'

function App() {
  const today = useClock()

  return (
    <>
      <Clock today={today} />
      <FileDrop />
      <ForwardRefTest />
      <ValidatableInputTest />
      <ArrayState />
      <RadioInputTest />
      <Callback />
      <Memo />
    </>
  )
}

export default App
