# useEffect

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
