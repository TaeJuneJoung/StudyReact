# TypeScript

## 개요

- JS: 동적 타입 - 런타임에서 동작할 때 타입 오류 확인
- TS: 정적 타입 - 코드 작성 단계에서 타입 오류 확인
  JS로 변환(컴파일) 후 브라우저나 Node.js환경에서 동작

타입스크립트는 JS의 슈퍼셋으로 완벽하게 호환! \*슈퍼셋: JavaScript 기능은 전부 다 가지고 있고 추가로 더 많은 기능을 가지고 있다라는 의미
대부분의 라이브러리, 프레임워크가 TS지원

### 설치 및 세팅

```bash
$ npm init -y
$ npm i -D parcel typescript
```

```json
// package.json
{
  "name": "01typescript",
  "version": "1.0.0",
  "description": "TypeScript",
  "scripts": {
    "dev": "parcel ./index.html",
    "build": "parcel build ./index.html"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "ESNext",
    "moduleResolution": "Node",
    "esModuleInterop": true, // JS: ESM, Node: CommonJS 호환해서 사용할 수 있는 옵션
    "lib": ["ESNext", "DOM"],
    "strict": true
  },
  "include": ["src/**/*.ts"], //TS 컴파일 과정에서 포함
  "exclude": ["node_modules"] // TS컴파일 과정에서 제외
}
```
