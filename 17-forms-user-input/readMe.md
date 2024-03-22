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

## FormData

```js
const fd = new FormData(event.target);
console.log(fd.get("role"));
```

form에서 submit 제출이 이뤄지게 되면 FormData에 해당 event.target의 값을 인자로 넣어서 값을 가져오는 방안이 있다.
get함수 안에 들어가는 요소는 가져올 사용자 입력 요소 태그에 name 속성값이다.

```html
<select id="role" name="role">
  <option value="student">Student</option>
  <option value="teacher">Teacher</option>
  <option value="employee">Employee</option>
  <option value="founder">Founder</option>
  <option value="other">Other</option>
</select>
```

그런데 이렇게 가져오게 되면 많은 요소들이 있을 때 다 작성해줘야하는 불편함이 있다. 이럴 때는 다음과 같이 진행할 수 있다.

```js
const fd = new FormData(event.target);
const data = Object.fromEntries(fd.entries());
console.log(data);
```

이렇게 했을 때 문제가 발생한다. 체크박스의 경우에는 그룹으로 되어 있는데 선택하지 않으면 값이 나오지 않고, 선택하면 마지막 선택한 값 1개만 등록되어 나오게 된다.

```js
const fd = new FormData(event.target);
const acquisitionChannel = fd.getAll("acquisition");
const data = Object.fromEntries(fd.entries());
data.acquisitionChannel = acquisitionChannel;
console.log(data);
```

다음과 같이 그룹으로 되어 있어서 가져와야 하는 요소는 `getAll`함수를 사용하여 name값을 주어 가져와서 처리해주면 된다.
