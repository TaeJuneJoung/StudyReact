# Forms User Input

## Forms가 까다로운 이유

### Input Validation

입력값 검증이 어렵다.

- 키를 누를 때마다 검증할 것인가 -> 너무 빠른 검증
- focus를 잃었을 때 검증할 것인가 -> 에러가 길게 보여진다
- form을 제출했을 때 검증할 것인가 -> 너무 느린 검증

개발하는 앱과 사용자에 적절한 해결책을 찾아야함.

## Form 제출 다루기

```jsx
<label htmlFor="email">Email</label>
```

해당 코드의 `htmlFor`의 의미는 for의 리액트 버전

```html
<label for="email">Email</label>
```

## State를 통한 사용자 입력 관리

```jsx
import { useState } from "react";

export default function Login() {
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  function handleSumbit(event) {
    event.preventDefault();
  }

  function handleInputChage(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  }

  return (
    <form onSubmit={handleSumbit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={enteredValues.email}
            onChange={(event) => handleInputChage("email", event.target.value)}
          />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={enteredValues.password}
            onChange={(event) =>
              handleInputChage("password", event.target.value)
            }
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
```

## Refs 사용자 입력 관리

```jsx
import { useRef } from "react";

export default function Login() {
  const email = useRef();
  const password = useRef();

  function handleSumbit(event) {
    event.preventDefault();

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    console.log(enteredEmail, enteredPassword);

    email.current.value = "";
    password.current.value = "";
  }

  return (
    <form onSubmit={handleSumbit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={email} />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" ref={password} />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
```

`useRef`방식이 코드양도 적고 편리하나 단점으로는 해당값을 초기화 해줄 때이다.
`email.current.value = "";` 이러한 방식으로 초기화 해주어야 하지만 권장되는 방식은 아니다.
