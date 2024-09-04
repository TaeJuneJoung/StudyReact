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

reducer 사용하여 state로직 통합

컴포넌트가 복잡해지면 컴포넌트의 state 업데이트 되는 다양한 경우를 한눈에 파악하기 어려워진다.

### useState를 사용한 예시 코드

```tsx
import { useState } from "react";

import type { taskProp } from "./models/Task";

import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

let nextId: number = 0;

function App() {
  const [tasks, setTasks] = useState<taskProp[]>([]);

  function handleAddTask(text: string) {
    setTasks([
      ...tasks,
      {
        id: nextId++,
        text: text,
        done: false,
      },
    ]);
  }

  function handleChangeTask(task: taskProp) {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else {
          return t;
        }
      })
    );
  }

  function handleDeleteTask(taskId: number) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  return (
    <>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChange={handleChangeTask}
        onDelete={handleDeleteTask}
      />
    </>
  );
}

export default App;
```

```ts
export interface taskProp {
  id: number;
  text: string;
  done: boolean;
}

export interface TaskListProps {
  tasks: taskProp[];
  onChange: (task: taskProp) => void;
  onDelete: (taskId: number) => void;
}

export interface TaskProps {
  task: taskProp;
  onChange: (task: taskProp) => void;
  onDelete: (taskId: number) => void;
}

export interface AddTaskProps {
  onAddTask: (text: string) => void;
}
```

```tsx
import { useRef } from "react";

import type { AddTaskProps } from "../models/Task";

export default function AddTask({ onAddTask }: AddTaskProps) {
  const textRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <input placeholder="Add task" ref={textRef} />
      <button
        onClick={() => {
          onAddTask(textRef.current?.value || "");
        }}
      >
        Add
      </button>
    </>
  );
}
```

```tsx
import { useState } from "react";

import type { TaskProps, TaskListProps } from "../models/Task";

export default function TaskList({ tasks, onChange, onDelete }: TaskListProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task task={task} onChange={onChange} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task, onChange, onDelete }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;

  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={(e) => {
            onChange({
              ...task,
              text: e.target.value,
            });
          }}
        />
        <button
          onClick={() => {
            setIsEditing(false);
          }}
        >
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button
          onClick={() => {
            setIsEditing(true);
          }}
        >
          Edit
        </button>
      </>
    );
  }

  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          onChange({
            ...task,
            done: e.target.checked,
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </label>
  );
}
```

### useReducer 사용한 예시 코드

- handleAddTask
- handleChangeTask
- handleDeleteTask

```ts
// Task.ts : Action Type 추가
export type Action =
  | { type: "added"; id: number; text: string }
  | { type: "changed"; task: taskProp }
  | { type: "deleted"; id: number };
```

```tsx
import { useReducer } from "react";

import type { taskProp, Action } from "./models/Task";

import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

let nextId: number = 0;

function tasksReducer(tasks: taskProp[], action: Action) {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case "changed": {
      return tasks.map((t) => {
        if (t.id !== action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unkown action"); // default 일때 action.type은 뭐지?
    }
  }
}

function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  function handleAddTask(text: string) {
    dispatch({
      type: "added",
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task: taskProp) {
    dispatch({
      type: "changed",
      task: task,
    });
  }

  function handleDeleteTask(taskId: number) {
    dispatch({
      type: "deleted",
      id: taskId,
    });
  }

  return (
    <>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChange={handleChangeTask}
        onDelete={handleDeleteTask}
      />
    </>
  );
}

export default App;
```

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

https://ko.react.dev/learn/extracting-state-logic-into-a-reducer

## useEffect

주로 외부 시스템과 동기화해야할 때 사용

기본적으로, Effect는 모든 렌더링 후에 실행된다.

⚠️아래와 같은 코드는 무한 루프를 만들어낸다.

```ts
const [count, setCount] = useState(0);
useEffect(() => {
  setCount(count + 1);
});
```

React에게 Effect를 불필요하게 다시 실행하지 않도록 지시하려면 두 번째 인자로 의존성 배열을 지정한다.

```ts
useEffect(() => {
  // ...
}, []);
```

⚠️의존성 배열이 없는 경우와 빈`[]` 의존성 배열이 있는 경우 동작이 다르다.

```ts
useEffect(() => {
  // 모든 렌더링 후에 실행
});

useEffect(() => {
  // 마운트될 때만 실행(컴포넌트가 나타날 때)
}, []);

useEffect(() => {
  // 마운트될 때 실행되며, 렌더링 이후에 a 또는 b 중 하나라도 변경된 경우에도 실행
}, [a, b]);
```

👴왜 ref는 의존성 배열에서 생략해도 되는가?

ref객체가 안정된 식별성(stable identity)을 가지기 때문

React는 동일한 `useRef`호출에서 항상 같은 객체를 얻을 수 있음을 보장한다. 의존성 배열에 포함하든 않든 상관없다.

useState로 반환되는 `set`함수들도 안정된 식별성을 가지기 때문에 종종 이러한 함수들도 의존성에서 생략되는 것을 볼 수 있다. lint가 의존성을 생략해도 오류를 표시하지 않는다면 그렇게 해도 안전하다.

ref가 부모 컴포넌트에서 전달되었다면 의존성 배열에 명시해야 한다. 부모 컴포넌트가 항상 동일한 ref를 전달하는지 또는 여러 ref 중 하나를 조건부로 전달하는지 알 수 없기 때문이다.

**클린업 함수 반환**

```ts
useEffect(() => {
  const connection = createConnection();
  connection.connect();
  return () => {
    connection.disconnect();
  };
}, []);

만약, Effect가 어떤 것을 구독(이벤트)한다면, 클린업 함수에서 구독을 해지해야 한다.

애니메이션으로 표시하는 경우는 클린업 함수에서 애니메이션을 초기 값으로 재설정해야 한다.

데이터를 가져온다면, 클린업 함수에서는 fetch를 중단하거나 결과를 무시해야 한다.


```

https://ko.react.dev/learn/synchronizing-with-effects

## Virtual DOM, Reconciliation(재조정)
