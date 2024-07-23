# props

컴포넌트를 통해서 모듈화하고 값을 전달하는 방안을 알아보기 위한 프로젝트

## issue

**🔥ts변경 이미지 import 문제**

ts로 변경하면서 이미지 부분에서 문제가 발생함.

이미지를 import할 때 에러가 발생하였는데 이를 해결하기 위해 src/images.d.ts 파일을 만들어서

```ts
declare module '*.png'
```

이와 같이 처리함

참고 사이트: https://velog.io/@fopa72/tsx%EC%97%90-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%B6%94%EA%B0%80%ED%95%A0-%EB%95%8C-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95-TypeScript

**🔥prettier 에러**

> Error [ERR_REQUIRE_ESM]: require() of ES Module path...\.prettierrc.js

이러한 에러가 발생했는데 json형태로 변경하고 형태를 그에 맞게 해주니 해결됐다.

```json
{
  "bracketSpacing": false,
  "jsxBracketSameLine": true,
  "singleQuote": true,
  "trailingComma": "none",
  "arrowParens": "avoid",
  "semi": false,
  "printWidth": 90
}
```
