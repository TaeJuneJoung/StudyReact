import {FC, useEffect, useState} from 'react'

type ProgressBarType = {
  timer: number
}

const ProgressBar: FC<ProgressBarType> = ({timer}) => {
  const [remainTime, setRemainTime] = useState<number>(timer)

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainTime(prevTime => prevTime - 10)
    }, 10)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return <progress value={remainTime} max={timer} />
}

export default ProgressBar
