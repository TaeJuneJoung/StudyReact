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

