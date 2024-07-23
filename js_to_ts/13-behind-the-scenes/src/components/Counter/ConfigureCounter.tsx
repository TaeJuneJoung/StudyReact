import {type FC, useState, type ChangeEvent} from 'react'
import log from '../../log'

type ConfigureCounterProps = {
  onSet: (num: number) => void
}

const ConfigureCounter: FC<ConfigureCounterProps> = ({onSet}) => {
  log('<ConfigureCounter />', 1)

  const [enteredNumber, setEnteredNumber] = useState<number>(0)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredNumber(notused => +e.target.value)
  }

  const handleSetClick = () => {
    onSet(enteredNumber)
    setEnteredNumber(notused => 0)
  }

  return (
    <section id="configure-counter">
      <h2>Set Counter</h2>
      <input type="number" onChange={handleChange} value={enteredNumber} />
      <button onClick={handleSetClick}>Set</button>
    </section>
  )
}

export default ConfigureCounter
