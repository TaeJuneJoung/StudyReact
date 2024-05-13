import {type FC, useState} from 'react'
import log from '../../log'

export type CounterHistory = {
  id: number
  value: number
}

type HistoryItemProps = {
  count: number
}

type CounterHistoryProps = {
  history: CounterHistory[]
}

const HistoryItem: FC<HistoryItemProps> = ({count}) => {
  log('<HistoryItem /> rendered', 3)

  const [selected, setSelected] = useState<boolean>(false)

  function handleClick() {
    setSelected(prevSelected => !prevSelected)
  }

  return (
    <li onClick={handleClick} className={selected ? 'selected' : undefined}>
      {count}
    </li>
  )
}

const CounterHistory: FC<CounterHistoryProps> = ({history}) => {
  log('<HistoryItem /> rendered', 3)
  return (
    <ol>
      {history.map(count => (
        <HistoryItem key={count.id} count={count.value} />
      ))}
    </ol>
  )
}

export default CounterHistory
