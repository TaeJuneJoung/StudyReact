import {type FC, useRef, useState} from 'react'

const Player: FC = () => {
  const playerName = useRef<HTMLInputElement>(null)
  const [editPlayerName, setEditPlayerName] = useState<string | undefined>(undefined)

  const onClick = () => {
    setEditPlayerName(notUsed => playerName.current?.value)
  }
  return (
    <section id="player">
      <h2>Welcome {editPlayerName ?? 'unkown entity'}</h2>
      <p>
        <input type="text" ref={playerName} />
        <button onClick={onClick}>Set Name</button>
      </p>
    </section>
  )
}

export default Player
