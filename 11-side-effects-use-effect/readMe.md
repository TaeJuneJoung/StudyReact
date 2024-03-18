# useEffect

해당 부분을 이해하기에 앞서 실행되는 순서를 먼저 파악해야 편할 것으로 보인다.

1. jsx Start/End : 컴포넌트 함수 밖에서의 시작/끝
2. COMPONENT Start/End : 컴포넌트 함수 시작/끝
3. useEffect Start/End : useEffect함수 시작/끝

```js
Modal.jsx START
Modal.jsx MODAL.jsx END
App.jsx APP.jsx START
App.jsx APP COMPONENT START
App.jsx APP COMPONENT END
Modal.jsx MODAL COMPONENT START
Modal.jsx MODAL COMPONENT END
Modal.jsx MODAL useEffect START
Modal.jsx MODAL useEffect END
App.jsx APP useEffect START
App.jsx APP useEffect END
```

## Side Effect

앱이 제대로 동작하기 위해 실행되어야 하지만 현재의 컴포넌트 렌더링 과정에 직접적인 영향을 끼치지 않는 작업.

```jsx
import { useRef, useState } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

function App() {
  const modal = useRef();
  const selectedPlace = useRef();
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState([]);

  navigator.geolocation.getCurrentPosition((position) => {
    // 이러한 처리를 컴포넌트 렌더링에는 직접적인 영향이 없으므로 Side Effect라고 한다.
    const sortedPlaces = sortPlacesByDistance(
      AVAILABLE_PLACES,
      position.coords.latitude,
      position.coords.longitude
    );

    setAvailablePlaces(sortedPlaces);
  });

  function handleStartRemovePlace(id) {
    modal.current.open();
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    modal.current.close();
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    modal.current.close();
  }

  return (
    <>
      <Modal ref={modal}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={AVAILABLE_PLACES}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
```

해당 코드의 경우에는 무한루프가 돌게 된다.
상태값이 달라지니 컴포넌트를 재실행하게 되고 다시 브라우저가 현재 위치를 확인하면서 상태값을 적용시키기에 무한루프.

## useEffect

반환하는 값은 없고 2개의 인자 필요.

`useEffect(부수 효과를 묶어줄 함수, dependency배열)`

```jsx
import { useRef, useState, useEffect } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

function App() {
  const modal = useRef();
  const selectedPlace = useRef();
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      // 이러한 처리를 컴포넌트 렌더링에는 직접적인 영향이 없으므로 Side Effect라고 한다.
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );

      console.log(sortedPlaces);
      setAvailablePlaces(sortedPlaces);
    });
  }, []);

  function handleStartRemovePlace(id) {
    modal.current.open();
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    modal.current.close();
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    modal.current.close();
  }

  return (
    <>
      <Modal ref={modal}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallBackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
```

리액트는 컴포넌트 함수의 실행이 완료된 후에 useEffect 부수 효과를 묶어줄 함수를 실행하게 된다.
상태 변화가 일어나서 컴포넌트가 재실행되면서 실행되야 정상이지만 의존성 배열이 들어와 리액트가 의존성 값을 살펴본 후에 값이 변화했을 경우에 한해 Effect함수를 재실행한다.

그러나 모든 Side Effect가 useEffect를 필요로 하진 않는다.
useEffect의 과한 사용이나 불필요한 곳에서의 사용은 좋지 않다.

**localStorage**

`localStorage.setItem(식별자, 저장되어야할 값);`

저장되어야할 값은 꼭 문자열 형태여야 한다.
배열이나 객체인 경우에는 `JSON.stringfy`메서드 등을 이용해 문자열 형태로 변환해주어야 한다.

```jsx
useEffect(() => {
  const storeIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
  const storePlaces = storeIds.map((id) =>
    AVAILABLE_PLACES.find((place) => place.id === id)
  );

  setPickedPlaces(storePlaces);
}, []);
```

이러한 방식의 Effect 사용은 권장하지 않는다.
위와 같은 진행은 한번에 진행이 이뤄지는 방식이지만 `geolocation`방식은 callback함수가 작동해야 한다. 이것은 브라우저에 의해 실행되는데다 시간이 지난 이후에나 일어나는 일이기 때문이다.

그렇기에 다음과 같이 작성하는 것이 권장되는 방안이다.

```jsx
const storeIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
const storePlaces = storeIds.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id)
);

const modal = useRef();
const selectedPlace = useRef();
const [availablePlaces, setAvailablePlaces] = useState([]);
const [pickedPlaces, setPickedPlaces] = useState(storePlaces);
```

`pickedPlaces` 초기값으로 localStorage에 있는 값을 주었다.

더군다나 해당 부분의 로직이 컴포넌트 안에 있을 필요 없다. 함수 밖에서 앱이 실행될 때 한번만 되면 됨.

## 브라우저 API를 싱크릴 위한 useEffect 활용

[Section8:Portals Modal](https://github.com/TaeJuneJoung/StudyReact/tree/develop/08-refs-portals#portals%ED%8F%AC%ED%83%88-%EC%86%8C%EA%B0%9C-%EB%B0%8F-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0)

이전에 Section8에서 모달을 위와 같이 다뤘었다.

이번에는 그 이전 방식을 사용했을 때 modalIsOpen상태 초기값 false이기에 close하라는 에러가 생겨서 useEffect를 사용해야하는 경우에 대해서 알아보자.

`Modal.jsx`는 컴포넌트 렌더링 작업과 직접적으로 연관되어 있지 않다.

## Effect Dependencis

Effect 의존성이란 속성이나 상태값으로 이해할 수 있다.

other effect dependencies would be functions or context values that depend on or use state or props.

컴포넌트가 실행될때마다 해당 함수가 진행되어야 하기 때문.
open상태값에 따라 변경될 수도 있다.

```jsx
useEffect(() => {
  if (open) {
    dialog.current.showModal();
  } else {
    dialog.current.close();
  }
}, [open]);
```

이후에 ESC를 눌러도 취소가 적용될 수 있게 해주어야 한다.

## useEffect의 Cleanup함수

모달창이 나오고 나서 아무 동작을 안하면 3초 후에 자동으로 confirm하여 삭제하게 하는 로직을 만들어보자.

```jsx
//DeleteConfirmation.jsx
useEffect(() => {
  const timer = setTimeout(() => {
    onConfirm();
  }, 3000);

  return () => {
    clearTimeout(timer);
  };
}, [onConfirm]);
```

Modal.jsx에 `children`요소를 open일 때만 나오게 삼항연산자 처리 한후에 위와 같이 하면 된다.
onConfirm은 함수이기에 이전의 값과 비교하게 되면 다르다(false).

```jsx
function func1() {
  console.log("A");
}

function func2() {
  console.log("A");
}

console.log(func1 === func2); // false
```

이러한 것과 유사하다.
그래서 useEffect 함수 내에 상태값을 변경하는 요소가 있다면 무한루프가 발생할 수 있다.
현재 여기서 문제가 발생하지 않는 이유는

```jsx
// Modal.jsx
return createPortal(
  <dialog className="modal" ref={dialog} onClose={onClose}>
    {open ? children : null}
  </dialog>,
  document.getElementById("modal")
);
```

이 부분에서 `{open ? children : null}` 해당 요소가 작용하고 있기 때문이다.
해당 요소가 적용되지 않았다면 무한루프에 돌게 된다.

## useCallback 훅

`useCallback(callback, 의존성객체)`
반환타입은 callback타입과 같다.

`useCallback<T extends Function>(callback: T, deps: DependencyList): T`

```jsx
const handleRemovePlace = useCallback(function handleRemovePlace() {
  setPickedPlaces((prevPickedPlaces) =>
    prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
  );
  // setModalIsOpen(false); // useCallback훅을 사용했기에 해당 처리를 안해도 무한루프에 돌지 않음
  // 로직적 다른 동작을 위해서 주석 풀고 사용하는 것이 좋음. & 추가적 안정성을 위해서 useCallback도 사용하면 좋음

  const storeIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
  localStorage.setItem(
    "selectedPlaces",
    JSON.stringify(storeIds.filter((id) => id !== selectedPlace.current))
  );
}, []);
```

컴포넌트가 재실행되었을 때 함수가 재생성되지 않게 함.
대신에 메모리 내부에 저장한다. 그래서 함수가 재실행 될때마다 메모리에 저장된 함수를 재사용한다.

## useEffect Cleanup: Interval

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    setRemainTime((prevTime) => prevTime - 10);
  }, 10);

  return () => {
    clearInterval(timer);
  };
}, []);
```

`remainTime` 상태값을 변화시키기에 컴포넌트가 지속적으로 재사용이 된다.
이러한 경우에는 모듈화 시켜서 다른 부분들까지 재실행하지 않도록 해주는 것이 좋다.
그래서 `ProgressBar.jsx`를 따로 두어서 관련된 부분만 따로 컴포넌트화 하였다.
