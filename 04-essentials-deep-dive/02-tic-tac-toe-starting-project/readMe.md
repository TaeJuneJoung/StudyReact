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

