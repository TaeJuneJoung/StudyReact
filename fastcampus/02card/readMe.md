# 카드 신청

## 다룰 내용

- 컴포넌트 재사용과 확장성(공통 컴포넌트)
- 전역 상태관리(Recoil)
  - Context API와의 차이점
- CSS in JS(Emotion)
- 폼을 다루는 방법
  - 값, 유효성 처리, COntrolled, UnControlled
- 유저가 지치지 않는 UI/UX

### 최적화 포인트

- Critical Rendering Path (가상돔)
- Thread를 점유하는 코드를 찾아 제거
- 컴포넌트를 우선순위에 따라 렌더링
- Layout Shift
- bundle analyzer를 이용하여 번들 사이즈 분석
- 트리쉐이킹을 이용하여 번들 사이즈 줄이기

## 환경 설정

[프로젝트 기본 환경설정](./setting.md)

### Firebase 설정

```bash
$ yarn add firebase
```

```ts
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const {
  REACT_APP_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER_ID,
  REACT_APP_APP_ID,
  REACT_APP_MEASUREMENT_ID,
} = process.env

const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID,
  measurementId: REACT_APP_MEASUREMENT_ID,
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const store = getFirestore(app)
```

.env를 만들어서 .gitignore에 추가한 다음에 키값 숨겨놓기

### Emotion

CSS in JS : JS 파일 내에 CSS를 작성하는 방식

장점
1. 컴포넌트 범위의 스타일 제공: 충돌 방지
2. 동적 스타일링: 자바스크립트 변수와 함께 사용하여 스타일을 동적으로 쉽게 변경 할 수 있다.
3. 코드 분할: 사용되는 스타일만 번들에 포함

단점

러닝커브, SSR적용시 추가적 설정 필요

https://emotion.sh/docs/introduction


```bash
$ yarn add @emotion/react @emotion/styled
$ yarn add -D @emotion/babel-plugin @babel/preset-react
```

```js
// craco.config.js
babel: {
  presets: [
    [
      '@babel/preset-react',
      { runtime: 'automatic', importSource: '@emotion/react' },
    ],
  ],
  plugins: ['@emotion/babel-plugin'],
},
```

craco.config.js에 해당 내용을 추가 해준다.

tsconfig.json에도 아래 내용 추가
```json
"jsxImportSource": "@emotion/react"
```

**emotion 사용 예시**
```tsx
import { css } from '@emotion/react'
import styled from '@emotion/styled'

// 스타일 변수 적용
const bold = css`
  font-weight: bold;
`

// 스타일
const containerStyles = css`
  background-color: pink;
  ${bold};
`
// 스타일 & 컴포넌트
const Button = styled.button`
  width: 200px;
  height: 100px;
  ${bold};
`

function App() {
  return (
    <div className="App" css={containerStyles}>
      <Button>스타일버튼</Button>
    </div>
  )
}
```

## 공통 컴포넌트 구현

styles폴더에 colorPalette와 globalStyles를 만들어서 해당 내용들이 적용되게 설정

```tsx
// index.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Global } from '@emotion/react'
import globalStyles from '@styles/globalStyles'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <App />
  </React.StrictMode>,
)
```

`<Global styles={globalStyles} />`해당 부분을 추가하여 적용함.

components/shared/Input.tsx에서 `&[aria-invalid='true']`를 통하여 input값 검증에 따른 스타일 처리. `aria-invalid` 속성을 사용.

