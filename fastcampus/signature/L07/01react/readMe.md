# React

## React해결하고자 한 문제

1. 효율적인 DOM 업데이트
2. 선언형 프로그래밍
3. 컴포넌트 기반
4. 단방향 데이터 흐름

```bash
$ npm create vite@latest
```

강좌에서는 JSX로 진행. TS를 배웠으나 맡은 파트가 달라 강사가 달라지면서 JSX부터 진행하는 것으로 보임.

그럼에도 여기서는 TS로 진행.

```tsx
const List = () => {
  const items: string[] = ["Date plan", "Apple", "Banana", "Cherry"];
  return (
    <ul>
      {items.map((item: string, index: number) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default List;
```

`key`값을 `index`로 사용하는 것은 지양해야 한다. 다른 요소가 들어오면 index값이 변경이 되어 key고유값이 아닐 수 있기 때문이다.

## 컴포넌트 만들기

### 이벤트 처리하기

```tsx
interface AlertProps {
  onAlert: () => void;
}

const Alert = ({ onAlert }: AlertProps) => {
  return <button onClick={onAlert}>Click</button>;
};

export default Alert;
```

브라우저마다 이벤트 처리방식이 다를 수 있는데 리액트는 이를 동일하게 처리할 수 있게 해준다. (SyntheticEvent)

### State

```tsx
import { type FC, useState } from "react";

const Counter: FC = () => {
  const [num, setNum] = useState<number>(0);
  const handleClick = () => {
    setNum(num + 1);
    setNum(num + 1);
    setNum(num + 1);
  };

  return (
    <>
      <div>{num}</div>
      <button onClick={handleClick}>+</button>
    </>
  );
};

export default Counter;
```

버튼을 클릭하면 3개씩 증가할 거 같지만 스냅샷처럼 이전의 값에서 더해지기 때문이다.

만약 하나씩 증가하는 형태를 만들고 싶으면 다음과 같이 고치면 된다.

```ts
const handleClick = () => {
  setNum((prev) => prev + 1);
  setNum((prev) => prev + 1);
  setNum((prev) => prev + 1);
};
```

```ts
const handleClick = () => {
  setNum((prev) => prev + 1);
  setTimeout(() => {
    alert(num);
  }, 1000);
};
```

이렇게 했을 때 alert의 결과는 어떠할까? 스냅샷 원리와 동일하게 +1 된 값이 아닌 이전값이 나오게 된다.

`setNum(num + 1);`로 진행해도 결과는 동일하다.
