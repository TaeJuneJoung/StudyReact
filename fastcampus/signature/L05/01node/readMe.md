# NPM

```bash
$ npm init

$ npm install lodash

# Bundler -> 웹 사이트에서 동작할 내용들을 하나로 묶어주는 역할
# parcel은 웹페이지에서 동작할 게 아니라 개발할 때만 사용할 것이기에 --save-dev(-D)를 써서 개발자 용도로 설치
$ npm install parcel --save-dev
```

https://parceljs.org/docs/

```json
"scripts": {
  "dev": "parcel ./index.html",
  "build": "parcel build ./index.html"
},
```

build를 하면 배포용으로 파일이 나오게 되며, 난독화가 이뤄짐.

## 유의적 버전(Semver)

`"lodash": "^4.17.21"`

예시로 lodash버전을 보았을 때 4(Major).17(Minor).21(Patch)로 구성되어 있다.

`Major.Minor.Patch`버전으로 구성되어 있다.

`^Major.Minor.Patch`carot기호(^)의 의미 : Major버전 안에서 가장 최신 버전으로 업데이트 가능 (Minor, Patch 변동 가능)

`npm info 라이브러리명`을 통해 해당 패키지 정보를 살펴볼 수 있다.

```bash
$ npm install 라이브러리명@버전
```

`~Major.Minor.Patch` tilde기호(~) : Minor버전 안에서 최신 버전으로 업데이트 가능 (Patch 변동만 가능)
