# 나만의 청첩장

## 최적화 포인트

- 이미지, 동영상, 폰트 등의 정적 리소스 최적화
- 불필요한 렌더링 줄이기
- UX경험 올리기(예상치 못한 에러 상황 대응)

## 프로젝트 환경 구성

- BoilerPlate -> Create React App + TypeScript
- Rules -> ESLint + Prettier
- Style -> SCSS
- Package Manager -> Yarn Berry(with .pnp)

> **NPM 안 쓰는 이유**
>
> - 무겁고 복잡한 node_modules
> - 비효율적인 의존성 검색
> - 비효율적인 설치(다른 버전의 패키지 중복 설치)
> - 유령의존성

> **Plug 'n' play(PnP)**
>
> - 효율적인 의존성 검색
> - 엄격한 의존성 관리
> - CI 시간 단축

1. Yarn 설치

```bash
$ npm install -g yarn
```

2. CRA 기반 프로젝트 생성

```bash
$ yarn create react-app wedding --template typescript
```

> **Yarn Berry(PnP) 설정**
>
> 1. Yarn Berry -`$ yarn set version berry` -> .yarn폴더와 yarnrc.yml 파일 이런 것들이 생성됨
> 2. Node linker설정 -`nodeLinker: pnp`
> 3. Yarn install -`$ yarn install`
> 4. Yarn Berry와 IDE통합 -ZipFS Plugin 설치
>    4-1. yarn dlx @yarnpkg/sdks vscode

node_modules 필요 없기에 삭제

yarnrc.yml에 해당 내용 추가

```yml
nodeLinker: pnp
```

이후에 `yarn install`

pnp.cjs 파일에서 의존성들을 관리하게 된다.

typescript 파일에 대한 오류가 발생함으로 zip파일을 읽어줄 수 있는 VS Code Extension에서 ZipFS Plugin 설치

`yarn dlx @yarnpkg/sdks vscode`

설치가 되면 VS Code가 typescript을 알아듣게 됨.

.vscode의 setting.json을 보게 되면 다음과 같게 된다.

```json
{
  "search.exclude": {
    "**/.yarn": true,
    "**/.pnp.*": true
  },
  "typescript.tsdk": ".yarn/sdks/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

해당 프로젝트 내에서 tsx파일 하나 들어가서 vs code 설정(windows: ctrl + sfhit + p) select typescript version에서 workspace에 설정으로 변경하면 오류가 해결됨. (단, 해당 프로젝트로 열린 vscode에서 해야함.)

yarn 사이트 가서 yarn ignore라고 검색한 후에 해당 내용 .gitignore에 추가

```git
.yarn/*
!.yarn/cache
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions
```

App.test.tsx에 가면 에러가 하나 발생하고 있는데 테스팅 라이브러리를 지웠다가 다시 설치해야함

```bash
$ yarn remove @testing-library/jest-dom
$ yarn add -D @types/testing-library__jest-dom @testing-library/jest-dom
```

---

npm에서 vite와 연동되면서 속도적인 측면이나 편의성이 괜찮아졌는데 굳이 이렇게 세팅해서 yarn으로 할 필요가 있을까?
