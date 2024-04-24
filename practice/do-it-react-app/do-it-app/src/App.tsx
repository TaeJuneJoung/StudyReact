import {useClock} from './hooks/useClock'
import Callback from './pages/Callback'
import Clock from './pages/Clock'
import Memo from './pages/Memo'

function App() {
  const today = useClock()

  return (
    <>
      <Clock today={today} />
      <Callback />
      <Memo />
    </>
  )
}

export default App
