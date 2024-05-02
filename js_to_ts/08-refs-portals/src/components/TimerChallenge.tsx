import {type FC, useState, useRef} from 'react'
import ResultModal, {type DialogActions} from './ResultModal'

export type TimerChallengeProps = {
  title: string
  targetTime: number
}

const TimerChallenge: FC<TimerChallengeProps> = ({title, targetTime}) => {
  const timer = useRef<number>()
  const dialog = useRef<DialogActions | null>(null)
  const [remainTime, setRemainTime] = useState<number>(targetTime * 1000)

  const isTimerActive = remainTime > 0 && remainTime < targetTime * 1000
  const INTERVAL_TIME = 10

  if (remainTime <= 0) {
    clearInterval(timer.current)
    dialog.current?.open()
  }

  const onReset = () => {
    setRemainTime(targetTime * 1000)
  }

  const handleStart = () => {
    timer.current = setInterval(() => {
      setRemainTime(prevRemainTime => prevRemainTime - INTERVAL_TIME)
    }, INTERVAL_TIME)
  }

  const handleStop = () => {
    dialog.current?.open()
    clearInterval(timer.current)
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainTime={remainTime}
        onReset={onReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second {targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={isTimerActive ? handleStop : handleStart}>
            {isTimerActive ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={isTimerActive ? 'active' : undefined}>
          {isTimerActive ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  )
}

export default TimerChallenge
