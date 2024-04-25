import {useCallback, useState} from 'react'
import {Button} from '../theme/daisyui'
import {Div, Subtitle} from '../components'

export default function NumberState() {
  const [count, setCount] = useState<number>(0)

  const increment = useCallback(() => {
    setCount(prevCount => prevCount + 1)
  }, [])

  const decrement = useCallback(() => {
    setCount(prevCount => prevCount - 1)
  }, [])

  return (
    <>
      <Div className=" flex justify-center my-5">
        <Button onClick={decrement}>-</Button>
        <Subtitle className="mx-3">{count}</Subtitle>
        <Button onClick={increment}>+</Button>
      </Div>
    </>
  )
}
