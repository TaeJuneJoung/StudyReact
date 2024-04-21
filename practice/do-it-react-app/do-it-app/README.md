# 리액트로 웹앱 만들기 with 타입스크립트

🤔TODO: React18에서 새로 등장한 기능인 useDeferredValue는 무슨 역할을 하는가?

## 1. 리액트 개발 준비

### 윈도우에서 리액트 개발 환경 만들기

- scoop - 윈도우용 설치 프로그램
- Homebrew - macOS용 설치 프로그램

### VSCode 개발 환경 설정하기

- prettier: 코드 정렬
- Tailwind CSS: CSS스타일링
- Headwind: 테일윈드CSS클래스 분류기
- PostCSS: CSS구문 강조 표시

ctrl + shift + p (mac: command + shift + p) -> User Settings -> 기본설정: 사용자 설정 열기(JSON)

```json
// settings.json
{
  "editor.tabSize": 2,
  // 프리티어 설정
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.formatOnPaste": true,
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

```js
// .prettierrc.js
module.exports = {
  bracketSpacing: false,
  jsxBracketSameLine: true,
  singleQuote: true,
  trailingComma: 'none',
  arrowParens: 'avoid',
  semi: false,
  printWidth: 90
}
```

### 리액트 프로젝트 만들기

**CRA 프로젝트 생성**

```bash
npx create-react-app 프로젝트_이름 --template typescript
```

**npm 설치 옵션**

- `--save` : dependencies 항목에 등록됨 (단축 명령 -S)

- `--save-dev` : devDependencies 항목에 등록됨 (단축 명령 -D)

자바스크립트로 개발된 패키지를 타입스크립트에서 사용하려면 `@types/`로 시작하는 타입 라이브러리를 추가로 설치해 줘야 한다.

**chance, luxon 패키지 설치하기**

- chance: 다양한 종류의 그럴듯한 가짜 데이터 제공
- luxon: 날짜 데이터를 '20분 전' 형태로 만들어 주는 유용한 기능 제공

```bash
npm i chance luxon
npm i -D @types/chance @types/luxon
```

## 2. 리액트 동작 원리

- React.StrictMode : 코드가 잘못되었는지 판단하여 적절한 오류 메시지를 보여 주는 컴포넌트
- reportWebVitals : 앱의 성능을 측정하는 기능으로 리액트 개발과는 직접 관련은 없다.

### 가상DOM

- react-dom/client : CSR(Client-Side Rendering)방식 웹 앱
- react-dom/server : SSR(Server-Side Rendering)방식 웹 앱
- react-native : 모바일 앱

> **React17 이후부터 React 임포트 구문이 사라지다.**
>
> ```tsx
> import React from 'react'
> ```
>
> 리액트 17버전 이전에는 JSX 구문이 있는 파일은 반드시 import를 해줘야 했지만, 이후부터는 생략해도 됨.

### 클래스 컴포넌트

```tsx
import {Component} from 'react'

export type ClassComponentProps = {
  href: string
  text: string
}

export default class ClassComponent extends Component<ClassComponentProps> {
  render() {
    const {href, text} = this.props
    return (
      <li>
        <a href={href}>
          <p>{text}</p>
        </a>
      </li>
    )
  }
}
```

### 함수형 컴포넌트

React 16이상부터는 React Hook덕분에 함수형 컴포넌트를 주로 사용.

- function 키워드 방식
- 화살표 방식

> **TypeScript import type 구문**
>
> ```ts
> import type {FC} from 'react'
> import {Component} from 'react'
> ```
>
> 타입스크립트에서 타입은 자바스크립트로 컴파일할 때만 필요한 정보로 컴파일 후 자바스크립트 코드에서는 타입 관련 내용이 완전히 제거된다. 반면에 클래스는 물리적으로 동작하는 메서드와 속성이 있으므로 자바스크립트 코드로 변환돼도 컴파일된 형태로 그대로 남는다.
> 해당 책에서는 FC처럼 타입스크립트 컴파일 때만 필요한 타입을 import type 구문으로 구현했다.

```tsx
import type {FC} from 'react'

export type ArrowComponentProps = {
  href: string
  text: string
}

const ArrowComponent: FC<ArrowComponentProps> = props => {
  const {href, text} = props
  return (
    <li>
      <a href={href}>
        <p>{text}</p>
      </a>
    </li>
  )
}

export default ArrowComponent
```

🤔TODO: type을 붙이면 무엇이 달라지는가?

🤔TODO: type과 interface 차이

```tsx
import type {FC} from 'react'
```

### key와 children 속성 이해하기

#### key 속성

```ts
type Key = string | number
```

: 컴포넌트가 여러 개일 때 이들을 구분하려고 리액트 프레임워크가 만든 속성

#### children 속성

```ts
children?: ReactNode | undefined;
```

리액트 17버전까지는 children 속성을 FC타입에 포함했는데 18버전부터는 FC 타입에서 제거하고 PropsWithChildren이라는 제네릭 타입을 새롭게 제공하였다.

```tsx
import type {FC, PropsWithChildren} from 'react'

export type pProps = {}
const P: FC<PropsWithChildren<pProps>> = props => {
  return <p {...props} />
}

export default P
```

함수 컴포넌트를 정의할 때 PropsWithChildren 타입을 사용하면 Props 타입에 반복해서 children속성을 추가할 필요가 없어지므로 코드를 더 깔끔하게 구성할 수 있다.

```tsx
import type {FC, ReactNode} from 'react'

export type pProps = {
  children?: ReactNode | undefined
}

const P: FC<pProps> = props => {
  return <p {...props} />
}

export default P
```

### 이벤트 속성

#### 이벤트 버블링

Event Bubbling: 자식 요소에서 발생한 이벤트가 가까운 부모 요소에서 가장 먼 부모 요소까지 계속 전달되는 현상

🤔TODO: stopPropagation과 preventDefault 함수

🤔TODO: 이벤트에 대한 타입들 까지도 다 알고 있어야하는건가?



#### `<input>` defaultValue와 defaultChecked 속성

defaultValue와 defaultChecked는 어떤 초깃값을 설정하고 싶을 때 사용



#### 드래그 앤 드롭 이벤트

|   종류    | 발생시기                                                     | 리액트 이벤트 속성 이름 |
| :-------: | ------------------------------------------------------------ | :---------------------: |
| dragenter | 드래그한 요소나 텍스트 블록을 적합한 드롭 대상 위에 올라갔을 때 발생 |       onDragEnter       |
| dragstart | 사용자가 요소나 텍스트 블록을 드래그하기 시작했을 때 발생    |       onDragStart       |
|   drag    | 요소나 텍스트 블록을 드래그할 때 발생                        |         onDrag          |
| dragover  | 요소나 텍스트 블록을 적합한 드롭 대상 위로 지나갈 때(수백 밀리초마다) 발생 |       onDragOver        |
| dragleave | 드래그하는 요소나 텍스트 블록이 적합한 드롭 대상에서 벗어났을 때 발생 |       onDragLeave       |
|  dragend  | 드래그를 끝냈을 때 발생                                      |        onDragEnd        |
|   drop    | 요소나 텍스트 블록을 적합한 드롭 대상에 드롭했을 때 발생     |         onDrop          |



## 3. 컴포넌트 CSS 스타일링
