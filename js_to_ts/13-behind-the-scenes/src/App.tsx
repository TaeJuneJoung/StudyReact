import {useState} from 'react'
import ConfigureCounter from './components/Counter/ConfigureCounter'
import Header from './components/Header'
import log from './log'

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
      </main>
    </>
  )
}

export default App
