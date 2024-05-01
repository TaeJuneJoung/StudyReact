import type {FC} from 'react'

import TimerChallenge, {type TimerChallengeProps} from './TimerChallenge'

const challengeList: TimerChallengeProps[] = [
  {title: 'Easy', targetTime: 1},
  {title: 'Not easy', targetTime: 5},
  {title: 'Getting tough', targetTime: 10},
  {title: 'Pros only', targetTime: 15}
]

const TimerChallenges: FC = () => {
  return (
    <div id="challenges">
      {challengeList.map((challenge, index) => (
        <TimerChallenge
          key={index}
          title={challenge.title}
          targetTime={challenge.targetTime}
        />
      ))}
    </div>
  )
}

export default TimerChallenges
