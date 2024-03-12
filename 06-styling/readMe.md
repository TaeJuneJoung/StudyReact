# Section06: Styling

## inline-style 리액트 앱 스타일링하기

```jsx
<p
  style={{
    color: "red",
    textAlign: "center",
    backgroundColor: 조건식 ? true값 : false값,
  }}
>
  A community of artists and art-lovers.
</p>
```

동적으로 style을 줄 때는 삼항 연산자를 사용 권장.

`&&`로 연산할 시에 false일 경우 해당 false값이 들어가기에 에러가 발생한다.

## CSS 클래스를 사용한 동적 및 조건적 스타일링

```jsx
<label className={`label ${emailNotValid ? "invalid" : ""}`}>Email</label>
```

## CSS 모듈로 CSS 규칙 스코핑하기

css파일의 이름을 `파일명.module.css`으로 변경

import 받는 방식도 다음과 같이 변경

```jsx
import logo from "../assets/logo.png";
import classes from "./Header.module.css";

export default function Header() {
  return (
    <header>
      <img src={logo} alt="A canvas" />
      <h1>ReactArt</h1>
      <p className={classes.paragraph}>
        A community of artists and art-lovers.
      </p>
    </header>
  );
}
```

이렇게 하면 vite 빌드할 때 모듈별로 따로 관리가 됨.

## Styled Components (서드 파티 패키지)

```bash
npm install styled-components
```

```jsx
import { styled } from "styled-components";

const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

<ControlContainer />;
```

> 해당 방안은 실제로 얼마나 쓰는지 모르겠지만 개인적으로 보았을 때 유지보수 차원에서 좋지 않아 보인다.
>
> 1. 작성한 CSS 파일 오류 여부 파악 안됨
> 2. 커스텀 Component들과 구별하기 어려워짐

```jsx
const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $invalid }) => ($invalid ? "#f87171" : "#6b7280")};
`;

const emailNotValid = submitted && !enteredEmail.includes("@");

<Label $invalid={emailNotValid}>Email</Label>;
```

이러한 방식으로 동적으로 받을 수 있는 장점은 있어 보인다.

`$invalid`에 $를 넣은 이유는 내장 속성과 충돌하지 않게 하기 위해서이다.

사용하지 않으면 console창에서 false이기에 에러가 생기고 있는 것을 확인할 수 있다.
