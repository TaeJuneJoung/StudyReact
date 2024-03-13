# 07Section

## State를 이용한 사용자 입력 관리(양방향 바인딩)

이전의 양방향 바인딩은 다음과 같이 진행했다.

click을 했을 때 적용하기 위해서 `useState`를 하나 더 사용하였다.

> 나는 강의와는 다르게 변수를 하나 쓰고 useState 하나로 진행하긴 했었다.
>
> 🧑🏻‍🏫 변수를 쓰는 것은 조심해야 한다. useState는 상태 업데이트 함수를 통해 값이 변화가 생기면 컴포넌트를 재실행하기 때문이다.

```jsx
import { useState } from "react";

export default function Player() {
  const [playerName, setPlayerName] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  function handlerChange(event) {
    setSubmitted(false);
    setPlayerName(event.target.value);
  }

  function handlerClick() {
    setSubmitted(true);
  }

  return (
    <section id="player">
      <h2>Welcome {submitted ? playerName : "unknown entity"}</h2>
      <p>
        <input type="text" onChange={handlerChange} value={playerName} />
        <button onClick={handlerClick}>Set Name</button>
      </p>
    </section>
  );
}
```

참조 기능인 **useRef**를 이용하면 다음과 같이 쉽게 표현될 수 있다.

```jsx
import { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef();
  const [editPlayerName, setEditPlayerName] = useState(null);

  function handlerClick() {
    setEditPlayerName(playerName.current.value);
  }

  return (
    <section id="player">
      <h2>Welcome {editPlayerName ?? "unknown entity"}</h2>
      <p>
        <input type="text" ref={playerName} />
        <button onClick={handlerClick}>Set Name</button>
      </p>
    </section>
  );
}
```

간략한 것도 간략한 것이지만 `onChange`이벤트로 인하여 타이핑이 이뤄질 때마다 함수를 호출하는 일이 없어서 성능적으로도 나아 보인다.

## Refs(참조)로 DOM 제어

```jsx
function handlerClick() {
  setEditPlayerName(playerName.current.value);
  playerName.current.value = "";
}
```

위와 같이 값을 비어주게 되면 DOM상호작용을 리액트가 해야한다는 규약이 위배하게 된다. 그러나 편리성이 있기에 해당 부분은 이렇게 사용한다.

> ??? 다른 방도는 없는건가?

## Refs(참조) vs. State(상태) 값

### State

상태 업데이트 함수를 통해 변화가 이루어졌을 때 상태 값들은 컴포넌트들의 재실행을 야기한다.

상태는 UI에 바로 반영되어야 하는 값들이 있을 때만 사용해야 한다.

상태를 사용하지 말아야 할 경우는 시스템 내부에 보이지 않는 쪽에서만 다루는 값들이나 UI에 직접적인 영향을 끼치지 않는 값들을 갖고 있을 경우이다.

### Refs

참조는 컴포넌트들이 다시 실행되게 하지 않는다.

refs는 DOM 요소에 직접적인 접근이 필요할 경우 사용된다.

## DOM 요소 연결 외 Refs(참조) 활용법

```jsx
import { useState } from "react";

export default function TimerChallenge({ title, targetTime }) {
  const [timerStart, setTimerStart] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  let timer;

  function handleStart() {
    timer = setTimeout(() => {
      setTimerExpired(true);
    }, targetTime * 1000);
  }

  function handleStop() {
    clearTimeout(timer);
  }

  return (
    <section className="challenge">
      <h2>{title}</h2>
      {timerExpired && <p>You lost!</p>}
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? "s" : ""}
      </p>
      <p>
        <button onClick={timerStart ? handleStop : handleStart}>
          {timerStart ? "Stop" : "Start"} Challenge
        </button>
      </p>
      <p className={timerStart ? "active" : undefined}>
        {timerStart ? "Time is running..." : "Timer inactive"}
      </p>
    </section>
  );
}
```

위에 `timer`변수로 `setTimeout`함수의 포인터 값을 받아서 `clearTimeout`으로 멈추려고 했는데 멈춰지지가 않았다. 이유는 useState로 인하여 상태 변화가 감지되어 컴포넌트가 재실행 되기 때문이다.

```jsx
import { useState } from "react";

let timer;

export default function TimerChallenge({ title, targetTime }) {
  const [timerStart, setTimerStart] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  function handleStart() {
    timer = setTimeout(() => {
      setTimerExpired(true);
    }, targetTime * 1000);
    setTimerStart(true);
  }

  function handleStop() {
    clearTimeout(timer);
    setTimerStart(true);
  }

  return (
    <section className="challenge">
      <h2>{title}</h2>
      {timerExpired && <p>You lost!</p>}
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? "s" : ""}
      </p>
      <p>
        <button onClick={timerStart ? handleStop : handleStart}>
          {timerStart ? "Stop" : "Start"} Challenge
        </button>
      </p>
      <p className={timerStart ? "active" : undefined}>
        {timerStart ? "Time is running..." : "Timer inactive"}
      </p>
    </section>
  );
}
```

`timer` 변수 선언을 함수 밖에서 하면 문제는 해결되는 것처럼 보였으나 다른 문제가 발생한다.
예를 들어, 5초와 1초 타이머 두 개를 누른 뒤에 멈추면 처음 STOP을 누른 애는 STOP이 안눌러진 현상이 발생한다.
이러한 이유는 변수를 컴포넌트 선언 밖에 사용해서 덮어씌워져서 발생하는 문제이다.
그러면 변수를 통해서 해결하는 것은 쉽지 않다는 것을 파악되었는데 어떻게 해결해야할까?

**useRef 사용**

```jsx
import { useState, useRef } from "react";

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const [timerStart, setTimerStart] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  function handleStart() {
    timer.current = setTimeout(() => {
      setTimerExpired(true);
    }, targetTime * 1000);
    setTimerStart(true);
  }

  function handleStop() {
    clearTimeout(timer.current);
    setTimerStart(true);
  }

  return (
    <section className="challenge">
      <h2>{title}</h2>
      {timerExpired && <p>You lost!</p>}
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? "s" : ""}
      </p>
      <p>
        <button onClick={timerStart ? handleStop : handleStart}>
          {timerStart ? "Stop" : "Start"} Challenge
        </button>
      </p>
      <p className={timerStart ? "active" : undefined}>
        {timerStart ? "Time is running..." : "Timer inactive"}
      </p>
    </section>
  );
}
```

## 커스텀 컴포넌트로 Refs(참조) 전달

모달창을 만들어서 ref로 해당 값을 보내서 제어하려고 할 때 다음과 같은 경고가 발생함

```jsx
// TimerChallenge.jsx
import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();
  const [timerStart, setTimerStart] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  function handleStart() {
    timer.current = setTimeout(() => {
      setTimerExpired(true);
      dialog.current.showModal();
    }, targetTime * 1000);
    setTimerStart(true);
  }

  function handleStop() {
    clearTimeout(timer.current);
  }

  return (
    <>
      <ResultModal ref={dialog} result="lost" targetTime={targetTime} />
      <section className="challenge">
        <h2>{title}</h2>
        {timerExpired && <p>You lost!</p>}
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerStart ? handleStop : handleStart}>
            {timerStart ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerStart ? "active" : undefined}>
          {timerStart ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
```

```jsx
// ResultModal.jsx
export default function ResultModal({ ref, result, targetTime }) {
  return (
    <dialog ref={ref} className="result-modal" open>
      <h2>Your Score: </h2>
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>X seconds left.</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
}
```

```js
Warning: ResultModal: `ref` is not a prop.
```

**forwardRef**
ref를 값을 보내기 위해서 `forwardRef` 기능을 활용
왜 ref를 보내는가에 대한 이유는 모달창이 떴는데 모달창에 집중될 수 있게 창 외에 흐릿한 검정으로 나타내기 위해서이다.

```jsx
// ResultModal.jsx
import { forwardRef } from "react";

const ResultModal = forwardRef(function ResultModal(
  { result, targetTime },
  ref
) {
  return (
    <dialog ref={ref} className="result-modal">
      <h2>Your Score: </h2>
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>X seconds left.</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;
```

`forwardRef`함수에 감싸서 변수로 export를 해주어야 하며 `ref`값은 ref로 써서 보내야하고 2번째 파라미터 값으로 받아야 한다. 참고로 첫번째 파라미터는 `props`값인데 `{}`를 통해 구조분해해서 여러값을 나눠 받았을 뿐이다. `ref`값을 저렇게 받을 수 있는 것도 `forwardRef`함수를 쓰기 때문.

🤔TODO: forwardRef에 대해서 살펴보자.
🤔TODO: userImperativeHandle에 대해서 살펴보자.

## userImperativeHandle 훅으로 컴포넌트 API 노출

큰 프로젝트의 경우에는 다른 개발자가 작성한 코드들을 봐야하는 경우가 많다. 그러기에 세부적인 내부 컴포넌트까지 다 살펴보는 것은 피로할 수 있다. 위에서 작성한 코드에서 `dialog.current.showModal();`부분은 `dialog`태그를 사용해서 `showModal()`를 사용했다는 것을 작성한 개발자는 알 수 있으나, 다른 개발자는 알기 위해서는 자식 컴포넌트까지 들어가서 살펴봐야할 것이다. 살펴봤는데 혹여나 dialog가 아니라 div태그라면 무슨 일인가 싶을 것이다. 그래서 파악하기 쉽게 자신의 함수를 노출하도록 구축하여 해당 함수를 호출하게 하려고 한다.

```jsx
// ResultModal.jsx
import { forwardRef, useImperativeHandle, useRef } from "react";

const ResultModal = forwardRef(function ResultModal(
  { result, targetTime },
  ref
) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return (
    <dialog ref={dialog} className="result-modal">
      <h2>Your Score: </h2>
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>X seconds left.</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;
```

이렇게 변경하고 난 뒤에 TimerChallenge.jsx에서 호출할 때는 `dialog.current.open();`이렇게 변경되었다.
