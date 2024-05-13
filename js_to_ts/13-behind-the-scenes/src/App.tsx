import {useState} from 'react'
import ConfigureCounter from './components/Counter/ConfigureCounter'
import Header from './components/Header'
import log from './log'
import Counter from './components/Counter/Counter'

function App() {
  log('<App /> rendered')

  const [choseCount, setChoseCount] = useState<number>(0)

  const handleSetCount = (newCount: number) => {
    setChoseCount(notused => newCount)
  }

  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSet={handleSetCount} />
        <Counter initialCount={choseCount} />
      </main>
    </>
  )
}

export default App
