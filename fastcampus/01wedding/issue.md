# ISSUE

## 1. Setting 이슈

버전업이 되면서 생긴 이슈

1. tsconfig.json
tsconfig.json에서 `@testing-library/jest-dom`이 정의되어 있지 않다는 에러가 발생하였고 이를 해결하기 위해서 `compilerOptions` 안에 다음을 추가 하였다.
```json
"types": ["@testing-library/jest-dom"],
```

2. eslint
extensions' has been removed, 'resolvepluginsrelativeto' has been removed.

에러가 발생하였고 v.9로 오면서 생긴 문제라고 하여 다운그레이딩 진행.

```bash
$ yarn remove eslint
$ yarn add -D eslint@8.57.0

$ yarn dlx @yarnpkg/sdks vscode
```