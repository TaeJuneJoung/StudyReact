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

## useReducer

:TODO:강의 내용만으로는 너무 별로.. 따로 정리가 필요할듯
강사가 강의를 너무 못한다... React 부분은 강사가 강의도 못하고 예시도 너무 적절하지 못함.

## Context API

props drilling에 빠지는 문제가 발생하기에 이를 해결하기 위한 방도.

```tsx
import { createContext, useContext } from "react";

const MyContext = createContext(null);

export const MyProvider = ({ children }) => {
  const value = { data: "hello world" };
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export const MyComponent = () => {
  const context = useContext(MyContext);
  return <div>{context.data}</div>;
};
```

```tsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext("light");

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const handleToggle = () => {
    setTheme((pre) => (pre === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, onToggle: handleToggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const ThemeComponent = () => {
  const { theme, onToggle } = useContext(ThemeContext);

  return (
    <div
      style={{
        background: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      <h1>Theme: {theme}</h1>
      <button onClick={onToggle}>Toggle</button>
    </div>
  );
};
```

```tsx
import { MyProvider, MyComponent } from "./contexts/MyContext";
import { ThemeComponent, ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <>
      <MyProvider>
        <MyComponent />
      </MyProvider>
      <ThemeProvider>
        <ThemeComponent />
      </ThemeProvider>
    </>
  );
}

export default App;
```

## useRef

```tsx
import { useState, useRef } from "react";

function App() {
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<number | undefined>(undefined);

  const handleStart = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      setSeconds((prev: number) => prev + 1);
    }, 1000);
  };

  const handleEnd = () => {
    clearInterval(timerRef.current);
    timerRef.current = undefined;
  };
  return (
    <>
      <h1>Timer: {seconds}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleEnd}>End</button>
    </>
  );
}

export default App;
```

```tsx
function FoucusInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>Focus</button>
    </div>
  );
}
```

## useEffect

## Virtual DOM, Reconciliation(재조정)
