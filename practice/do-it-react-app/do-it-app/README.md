# 리액트로 웹앱 만들기 with 타입스크립트

TODO: React18에서 새로 등장한 기능인 useDeferredValue는 무슨 역할을 하는가?

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

## 가상DOM

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
