import {type FC, memo, useMemo, useState, useCallback} from 'react'
import log from '../../log'
import IconButton from '../UI/IconButton'
import MinusIcon from '../UI/Icons/MinusIcon'
import PlusIcon from '../UI/Icons/PlusIcon'
import CounterHistory, {type CounterHistory as CounterHistoryType} from './CounterHistory'
import CounterOutput from './CounterOutput'

type CounterType = {
  initialCount: number
}

const isPrime = (num: number): boolean => {
  log('Calculating if is prime number', 2, 'other')

  if (num <= 1) return false

  const limit = Math.sqrt(num)

  for (let i = 2; i <= limit; i++) {
    if (num % i === 0) return false
  }

  return true
}

const Counter: FC<CounterType> = memo(({initialCount}) => {
  log('<Counter /> rendered', 1)

  const initialCountIsPrime = useMemo(() => isPrime(initialCount), [initialCount])
  const [counterChanges, setCounterChanges] = useState<CounterHistoryType[]>([
    {value: initialCount, id: Math.random() * 1000}
  ])

  const currentCounter = counterChanges.reduce(
    (prevSum, counterChange) => prevSum + counterChange.value,
    0
  )

  const handleDecrement = useCallback(() => {
    setCounterChanges(prevCounterChanges => [
      {value: -1, id: Math.random() * 1000},
      ...prevCounterChanges
    ])
  }, [])

  const handleIncrement = useCallback(() => {
    setCounterChanges(prevCounterChanges => [
      {value: 1, id: Math.random() * 1000},
      ...prevCounterChanges
    ])
  }, [])

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{' '}
        <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={currentCounter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
      <CounterHistory history={counterChanges} />
    </section>
  )
})

export default Counter
