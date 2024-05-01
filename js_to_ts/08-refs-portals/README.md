# Ref & Portals

```tsx
// components/Player.tsx
import { FC, useState } from "react";

const Player: FC = () => {
  const [playerName, setPlayerName] = useState<string>("");
  const onClick = () => {};

  return (
    <section id="player">
      <h2>Welcome {playerName ?? "unkown entity"}</h2>
      <p>
        <input type="text" name="" id="" />
        <button onClick={onClick}>Set Name</button>
      </p>
    </section>
  );
};

export default Player;
```

1. button에서 input의 값을 가져와야하는데 `event.target.value`에서 onClick의 event.target은 button이기에 성립하지 못한다.

2. onChange를 사용하면 성능상 지속적으로 호출이되어 좋지 않음

3. 상태 변화가 자주 일어나면 그만큼 화면 렌더링이 계속 이뤄지기에 좋지 않음

**useRef 사용**

```tsx
// components/Player.tsx
import { FC, useRef } from "react";

const Player: FC = () => {
  const playerName = useRef<HTMLInputElement>(null);

  const onClick = () => {
    console.log(playerName.current?.value);
  };
  return (
    <section id="player">
      <h2>Welcome {playerName.current?.value ?? "unkown entity"}</h2>
      <p>
        <input type="text" ref={playerName} />
        <button onClick={onClick}>Set Name</button>
      </p>
    </section>
  );
};

export default Player;
```

이렇게만 사용해서 진행하니 useRef는 백그라운드 형태로 돌아가고 리렌더링에 영향을 주지 않기에 화면에 변경된 이름이 적용되지 않는다. 이를 해결하기 위해 useState를 사용.

```tsx
// components/Player.tsx
import { FC, useRef, useState } from "react";

const Player: FC = () => {
  const playerName = useRef<HTMLInputElement>(null);
  const [editPlayerName, setEditPlayerName] = useState<string | undefined>(
    undefined
  );

  const onClick = () => {
    setEditPlayerName((notUsed) => playerName.current?.value);
  };
  return (
    <section id="player">
      <h2>Welcome {editPlayerName ?? "unkown entity"}</h2>
      <p>
        <input type="text" ref={playerName} />
        <button onClick={onClick}>Set Name</button>
      </p>
    </section>
  );
};

export default Player;
```
