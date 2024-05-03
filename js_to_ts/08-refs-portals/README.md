# Ref & Portals

```tsx
// components/Player.tsx
import {FC, useState} from 'react'

const Player: FC = () => {
  const [playerName, setPlayerName] = useState<string>('')
  const onClick = () => {}

  return (
    <section id="player">
      <h2>Welcome {playerName ?? 'unkown entity'}</h2>
      <p>
        <input type="text" name="" id="" />
        <button onClick={onClick}>Set Name</button>
      </p>
    </section>
  )
}

export default Player
```

1. button에서 input의 값을 가져와야하는데 `event.target.value`에서 onClick의 event.target은 button이기에 성립하지 못한다.

2. onChange를 사용하면 성능상 지속적으로 호출이되어 좋지 않음

3. 상태 변화가 자주 일어나면 그만큼 화면 렌더링이 계속 이뤄지기에 좋지 않음

**useRef 사용**

```tsx
// components/Player.tsx
import {FC, useRef} from 'react'

const Player: FC = () => {
  const playerName = useRef<HTMLInputElement>(null)

  const onClick = () => {
    console.log(playerName.current?.value)
  }
  return (
    <section id="player">
      <h2>Welcome {playerName.current?.value ?? 'unkown entity'}</h2>
      <p>
        <input type="text" ref={playerName} />
        <button onClick={onClick}>Set Name</button>
      </p>
    </section>
  )
}

export default Player
```

이렇게만 사용해서 진행하니 useRef는 백그라운드 형태로 돌아가고 리렌더링에 영향을 주지 않기에 화면에 변경된 이름이 적용되지 않는다. 이를 해결하기 위해 useState를 사용.

```tsx
// components/Player.tsx
import {FC, useRef, useState} from 'react'

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
```

dialog HTML 태그는 모달창을 편하게 만들어 주는 HTML의 새로운 기능 태그 (2022년)

2014년 dialog 요소가 등장했지만 요소를 거의 사용할 수 있게 된건 22년이라고 보면 된다.

- show: 절대적 위치에 열린다. -> position: absolute / 사용자의 행동 제한하지 않음

- showModal: 사용자의 행동 제한

- close: 모달창 닫기

https://velog.io/@semnil5202/Dialog-%ED%83%9C%EA%B7%B8%EB%A1%9C-%EB%AA%A8%EB%8B%AC-%EC%89%BD%EA%B2%8C-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
