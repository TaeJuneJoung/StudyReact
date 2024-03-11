# Tic Tac Toe

## 모든 콘텐츠가 컴포넌트에 있을 필요는 없다.

고정적인 부분은 index.html에 작성해도 괜찮다. (프로젝트 기획/구성에 따라 다르지만)

## 옛State를 기반으로 올바르게 상태 업데이트하기

```jsx
const [ isEditing, setIsEditing ] = useState(false);

function handleEditClick() {
  setIsEditing(!isEditing);
}
```

이와 같이 `!`연산자를 이용한 바로 상태변화를 주는 것을 react에서는 권장하지 않는다. 권장하는 방식은 다음과 같다.

```jsx
function handleEditClick() {
  setIsEditing((editing) => !editing);
}
```

This function will automatically be called by React and will receive the guaranteed latest state value.
> 이 함수는 React에 의해 자동으로 호출되며 보장된 최신 상태 값을 받습니다.

리액트가 상태에 대한 스케줄을 조율한다.

이슈는 다음과 같을 때 발생하는 것을 확인할 수 있다.
```jsx
const [ isEditing, setIsEditing ] = useState(false);

function handleEditClick() {
  setIsEditing(!isEditing); // 예상값 true / 실제 true
  setIsEditing(!isEditing); // 예상값 false / 실제 true 적용됨
}
```
컴포넌트 변화 전의 상태를 가지고 있기에 이런 현상이 발생된다.
처음 `setIsEditing(!isEditing)`에서 `isEditing`이 가진 값은 false이고 두 번째 `isEditing` 또한 false값을 가지고 있기 때문이다.

리액트가 권장하고 있는 `setIsEditing((editing) => !editing)` 해당 방식을 이용하면 변경된 최신의 상태를 가지고 있기에 해당 방안을 사용 해야 한다.


## 사용자 입력 & 양방향 바인딩

```jsx
<input type="text" value={name} required />;
```
이렇게 작성하니 수정이 안된다. 계속 value값으로 적용된다. 이 문제를 해결하는 방법으로 양방향 바인딩을 사용하자.

기존에 받던 `name` 파라미터 키워드를 `initialName`으로 변경하였다. (당연히 컴포넌트를 사용하는 App.jsx에 키워드 값도 변경함.)

```jsx
// Player.jsx
import { useState } from "react";

export default function Player({ initialName, symbol }) {
  const [ playerName, setPlayerName ] = useState(initialName);
  const [ isEditing, setIsEditing ] = useState(false);

  function handleEditClick() {
    setIsEditing((editing) => !editing);
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  let btnCaption = 'Edit';
  
  if (isEditing) {
    editablePlayerName = (
      <input type="text" value={playerName} onChange={handleChange} required />
    );
    btnCaption = 'Save';
  }


  return (
    <li>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{btnCaption}</button>
    </li>
  );
}
```

`onChange`를 통하여 이벤트를 처리하고 `value`값으로 해당 useState의 값을 연결하여 상태 적용을 하였다. 이벤트를 연결한 `handleChange`에서 event값에 접근하여 변경될때마다 값을 적용하게 하였다.

## 불변의 객체 State 업데이트하기

[Reference vs Primitive Values](https://academind.com/tutorials/reference-vs-primitive-values)

```js
const updatedUser = user;
user.name = 'Max';
```
이러한 Copy방식을 사용하면 얕은 복사이기에 원본/카피값에 영향을 준다.

```js
const updatedUser = { ...user }; // Spread Operator
updatedUser.name = 'Max';
```
깊은 복사 방식을 사용하여 원본값에 영향이 없게 하는 것이 좋다.


```jsx
const initalGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const [gameBoard, setGameBoard] = useState(initalGameBoard);

function handleSelectSquare(rowIndex, colIndex) {
  setGameBoard((prevGameBoard) => {
    prevGameBoard[rowIndex][colIndex] = 'X';
    return prevGameBoard;
  });
}
```
이러한 방식을 사용하게 되면 메모리 속의 기존 값을 바로 변경하게 된다. 이 시점은 리액트가 실행하는 예정된 상태 업데이트보다 이전에 이뤄지게 된다. 그러므로 알 수 없는 버그나 부작용이 생길 수 있다.

```jsx
function handleSelectSquare(rowIndex, colIndex) {
  setGameBoard((prevGameBoard) => {
    const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    updatedBoard[rowIndex][colIndex] = 'X';
    return updatedBoard;
  });
}
```
이러한 방식으로 처리하는 것을 권장한다.

## 다시 볼 부분

Log.jsx 만드는 부분부터 이해가 잘 안감

해당 부분은 82강부터

