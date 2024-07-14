# 환경 설정

01wedding에서 기본적인 설치를 한 것들이 있기에 그 부분 제외

1. CRA기반 프로젝트 생성

```bash
$ yarn create react-app 02card --template typescript
$ rm -rf node_modules
```

2. yarn berry 설정

- `$ yarn set version berry`
- yarnrc.yml파일에 `nodeLinker: pnp` 추가
- `$ yarn install`
- `$ yarn dlx @yarnpkg/sdks vscode`

3. .gitignore에 추가

```git
.yarn/*
!.yarn/cache
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions
```

4. App.tsx 들어가면 ts 설정에 대한 창 allow 클릭

5. App.test.tsx 에러 -> 테스팅 라이브러리 재설치

```bash
$ yarn remove @testing-library/jest-dom
$ yarn add -D @types/testing-library__jest-dom @testing-library/jest-dom
```

6. Prettier 설정

```json
// .prettierrc
{
  "useTabs": false,
  "printWidth": 80,
  "tabWidth": 2,
  "singleQuote": true,
  "trailingComma": "all",
  "endOfLine": "lf",
  "semi": false,
  "arrowParens": "always"
}
```

7. ESLint 설정
```json
// .eslintrc.json
{
  "extends": [
      "react-app",
      "react-app/jest",
      "plugin:prettier/recommended"
  ],
  "plugins": ["prettier"],
  "rules": {
      "prettier/prettier": "error"
  }
}
```

8. Prettier & ESLint 적용

- package.json 불필요 부분 삭제
```json
"eslintConfig": {
  "extends": [
    "react-app",
    "react-app/jest"
  ]
},
```

- 설치
```bash
$ yarn add -D eslint prettier eslint-plugin-prettier eslint-config-prettier eslint-plugin-react eslint-config-react-app
```

- tsconfig.json
`compilerOptions` 안에 아래 내용 추가

```json
"types": ["@testing-library/jest-dom"],
```

9. 버전 차이로 인한 이슈 처리(Downgrade)
```bash
$ yarn remove eslint
$ yarn add -D eslint@8.57.0

$ yarn dlx @yarnpkg/sdks vscode
```

10. 커맨드를 통한 lint 추가

```json
//pakcage.json
"lint": "eslint \"src/**/*{js,jsx,ts,tsx}\"",
"lint:fix": "eslint --fix \"src/**/*{js,jsx,ts,tsx}\""
```

11. craco 설치
```bash
$ yarn add -D @craco/craco craco-alias
```

12. tsconfig.paths.json

해당 파일 생성 후 아래 내용 작성

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"]
    }
  }
}
```

- tsconfig.json에 path설정 읽을 수 있게 설정
```json
"extends": "./tsconfig.paths.json",

//include 안에 추가
"tsconfig.paths.json"
```

13. craco.config.js

해당 파일 생성 후 아래 내용 작성

```js
const CracoAlias = require('craco-alias')

module.exports = {
  plugins: [
		{
			plugin: CracoAlias,
			options: {
				source: 'tsconfig',
				tsConfigPath: 'tsconfig.paths.json',
			}
		}
	]
}
```

- package.json에 시작하는 명령어 craco로 수정