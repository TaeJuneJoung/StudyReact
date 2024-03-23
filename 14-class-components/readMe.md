# Class Component

## 클래스 기반 컴포넌트

**Functional Components**

```jsx
import { useState } from "react";

const Users = () => {
  const [showUsers, setShowUsers] = useState(true);

  const toggleUsersHandler = () => {
    setShowUsers((curState) => !curState);
  };

  const usersList = (
    <ul>
      {DUMMY_USERS.map((user) => (
        <User key={user.id} name={user.name} />
      ))}
    </ul>
  );

  return (
    <div className={classes.users}>
      <button onClick={toggleUsersHandler}>
        {showUsers ? "Hide" : "Show"} Users
      </button>
      {showUsers && usersList}
    </div>
  );
};
```

**Class-based Components**

```jsx
import { Component } from "react";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      showUsers: true,
    };
    // and it also has to be a property named "state"! This name is NOT up to you.
  }

  toggleUsersHandler() {
    // this.state.showUsers = false; // NOT!
    this.setState((curState) => {
      return { showUsers: !curState.showUsers };
    });
  }

  render() {
    const usersList = (
      <ul>
        {DUMMY_USERS.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? "Hide" : "Show"} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}
```

리액트 16.8버전 이전에 클래스 기반 컴포넌트를 주로 활용했었다.
16.8버전부터 리액트 훅에 대한 개념들을 도입하면서 함수형 컴포넌트를 사용하기 시작함.
리액트 훅은 클래스 기반 컴포넌트에서 사용이 불가능하다.

## 컴포넌트 생명 주기(클래스 컴포넌트만 해당)

클래스 컴포넌트에는 useEffect와 같은 리액트 훅을 사용할 수 없다.

컴포넌트 생명 주기를 통해서 해결할 수 있는데 보편적으로 사용 되는 것은 다음 3가지 메소드이다.

- componentDidMount() : 컴포넌트가 마운트 되면 호출(컴포넌트가 평가되고 DOM에 렌더링될 때) -> `useEffect(..., [])`
- componentDidUpdate() : 컴포넌트가 갱신되면 호출 -> `useEffect(..., [someValue])`
- componentWillUnmount() : 컴포넌트가 DOM에서 삭제되기 직전에 호출 -> useEffect에 있는 cleanup함수. `useEffect(() => {return () => {...}}, [])`

## 오류 경계

컴포넌트 내에서 오류가 생기면 `try-catch`문을 사용해서 에러 처리를 하면 된다.
자식 컴포넌트에서 오류가 생겨서 부모 요소에서 처리하고 싶을 때 어떻게 하면 될까?

- componentDidCatch() : 컴포넌트에 추가하게 되면 클래스 컴포넌트를 오류 경계로 만들게 된다.

오류 경계란 이러한 생명 주기 메소드를 갖는 컴포넌트를 지칭하는 용어이다.
오류 경계에 해당하는 함수형 컴포넌트는 존재하지 않는다.
하위 컴포넌트 중 하나가 오류를 만들거나 전달할 때 발동한다.
