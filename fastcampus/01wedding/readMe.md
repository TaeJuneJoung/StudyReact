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

### Perttier와 ESLint 세팅

VS Code에서 Extension 설치

#### ESLint 설정

1. 설치 
```bash
$ yarn add -D eslint prettier eslint-plugin-prettier eslint-config-prettier eslint-plugin-react eslint-config-react-app
```

2. Config 설정 분리

.eslintrc.json 파일을 만들어서 package.json 부분에서 해당 부분을 지우기.
```json
"eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
```

.eslintrc.json에 작성한 내용
```json
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

.prettierrc 작성한 내용
```json
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

VS CODE settings.json에 설정된 내용
**기존 내가 한 내용**
```json
{
  "editor.tabSize": 2,
  "terminal.integrated.defaultProfile.windows": "Git Bash",
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.formatOnPaste": true,
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}

```

**강의 내용**
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.eol": "\n",
}
```



3. yarn dlx @yarnpkg/sdks vscode

---

npm에서 vite와 연동되면서 속도적인 측면이나 편의성이 괜찮아졌는데 굳이 이렇게 세팅해서 yarn으로 할 필요가 있을까?


### 발생하는 에러 해결 방안

[ISSUE](./issue.md)

### Craco

Craco는 Create-React-App Configuration Override의 약어로, CRA에 config 설정을 덮어쓰기 위한 패키지

https://craco.js.org/


```bash
$ yarn add -D @craco/craco craco-alias
```

package.json 내용 수정
```json
"start": "craco start",
"build": "craco build",
"test": "craco test",
```

Craco를 통해서 바벨이나 웹팩 등의 설정도 쉽게 변경할 수 있다.

tsconfig.paths.json 파일 생성


### SCSS

CSS의 기능을 확장시켜주는 도구

CSS의 모든 기능을 포함하고 있고, 변수, 믹스인, 상속과 같은 추가적인 기능들을 제공하여 코드의 재사용성을 높이고 유지보수를 용이하게 만들어준다.

```bash
$ yarn add classnames sass
```

### JSON Server

JSON파일을 이용하여 REST API서버를 빠르고 간단하게 생성하기 위한 도구

JSON server를 이용하면 JSON파일을 데이터베이스처럼 동작하게 할 수 있고, HTTP 메서드를 활용하여 데이터에 접근하고 수정할 수 있는 api를 만들 수 있다.

https://github.com/typicode/json-server

```bash
$ yarn add -D json-server
```

db.json파일을 만든 후에

```bash
$ json-server --watch db.json
```

### Font

EOT -> TTF/OTF -> WOFF -> WOFF2순으로 용량이 작다.

WOFF의 경우 지원해주는 브라우저가 폭 넓음. WOFF2는 최신이다보니 버전이 높고 지원을 안하는 브라우저도 있다. WOFF2를 사용하되 지원하지 못하는 브라우저를 위해서 WOFF를 사용.


#### 폰트 적용 방법

1. 웹 폰트 서비스 이용

ex) `<link href="폰트서비스" />`

https://hangeul.naver.com/font/clova

웹 폰트 서비스를 이용했을 때 해당 서비스와의 통신이 문제가 생기면 웹페이지에서 문제가 발생할 수 있다는게 단점.

2. 폰트 다운로드

ex) @font-face {font-family: "폰트이름"; src: url("폰트경로");}

ttf형태로 다운 받은 것을 WOFF, WOFF2로 변경해주기 위해서

https://cloudconvert.com


svg이미지 구하는 곳

https://www.iconfinder.com/



### 인트로 동영상 구현

- MP4(MPEG-4 Part 14): MP4는 최신 웹 브라우저 대부분과 호환되는 인터넷 친화적인 비디오 포맷

- WebM: HTML5비디오 및 오디오 태그와 함께 사용하기 위해 Google이 개발한 비디오 포맷. 고화질 동영상을 손실 없이 효과적으로 압축할 수 있는 고성능 비디오 코덱인 VP8 및 VP9을 지원


WebM과 MP4를 함께 사용하는 방법을 많이 사용하고 있다.


```bash
$ yarn add date-fns
```

```tsx
<video controls autoPlay={true} muted={true} loop>
  <source src="main.mp4" type="video/mp4"></source>
</video>
```

source태그를 사용할 경우에는 autoPlay만 사용해서는 안되고 muted 태그도 사용해주어야 동작하게 된다.

### 이미지 갤러리

https://developer.mozilla.org/ko/docs/Learn/CSS/CSS_layout/Grids


```bash
$ yarn add swiper@^9
```

https://swiperjs.com/react

여기서는 최신 11버전으로 진행했으며 문제없이 작동


### 본문 구현하기

`@mixin`을 사용하여 공통 css클래스를 처리

```scss
@import "@scss/utils.scss";

.container {
    @include txt-content
}
```

### 캘린더 구현

https://react-day-picker.js.org

```bash
$ yarn add react-day-picker
```


```tsx
<DayPicker
  locale={ko}
  month={weddingDate}
  selected={weddingDate}
  formatters={{ formatCaption: () => '' }}
/>
```

`formatters={{ formatCaption: () => '' }}` 부분은 사용하지 않으면 기본적으로 월 연도가 나오던 부분을 안나오게 처리함


### 지도 구현

https://apis.map.kakao.com

`.env` 파일을 통한 key값 처리

```tsx
const mapContainer = useRef(null)

useEffect(() => {
  const script = document.createElement('script')
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&autoload=false`
  script.async = true

  document.head.appendChild(script)

  script.onload = () => {
    window.kakao.maps.load(() => {
      const position = new window.kakao.maps.LatLng(
        location.lat,
        location.lng,
      )

      const option = {
        center: position,
        level: 3,
      }

      const marker = new window.kakao.maps.Marker({
        position,
      })
      const map = new window.kakao.maps.Map(mapContainer.current, option)
      marker.setMap(map)
    })
  }
}, [location])
```

### 연락처와 계좌 정보

1. 아코디언 UI

https://getbootstrap.com/docs/5.3/components/accordion/

https://mui.com/material-ui/react-accordion/

2. 계좌 복사

https://www.npmjs.com/package/react-copy-to-clipboard

```bash
$ yarn add react-copy-to-clipboard
$ yarn add -D @types/react-copy-to-clipboard
```

3. 전화 걸기

4. 카카오페이 송금 링크

### 공유하기

https://developers.kakao.com/docs/latest/ko/message/message-template

### 참석 여부 구현

