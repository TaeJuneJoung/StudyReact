# Mac M1

Mac북으로 해당 프로젝트 적용 시키기 위한 세팅

## 1. Homebrew 설치

macOS 운영 체제에서 사용되는 패키지 관리자

```bash
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
$ (echo; echo 'eval "$(/usr/local/bin/brew shellenv)"') >> /Users/{사용자명}/.zprofile
$ eval "$(/usr/local/bin/brew shellenv)"
```

명령어 작동 및 설치 확인
```bash
$ brew --version 
```

## 2. git 설치

```bash
$ brew install git
$ echo "export PATH=/usr/local/bin:$PATH" >> ~/.bash_profile
```

## 3. nvm 설치

node를 바로 설치해도 되지만 버전 관리를 위해서 nvm부터 설치

https://github.com/nvm-sh/nvm

```bash
$ touch .zshrc
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
$ source .zshrc
```

## 4. Node 설치

```bash
$ nvm install --lts
```

## 5. yarn 설치

```bash
$ brew install yarn
```

## issue

### 1. yarn pnpm craco 에러

`yarn install`을 하면 에러가 발생하였음.

1) 설정 파일 제거

```bash
$ rm -rf node_modules
$ rm yarn.lock

$ yarn install
```

2) TypeScript 버전 맞춰주기

VS Code 확장 기능 `ZipFS Plugin` 설치 후, `yarn dlx @yarnpkg/sdks vscode` 실행

그 후에 command + shift + p를 이용하여 설정에서 타입스크립트 버전 설정(tsx파일에서 설정해야함)

3) .env

해당 파일 생성 후 키값들 추가해야함. `REACT_APP_`으로 진행

4) CODE 규칙을 위한

- Prettier와 ESLint 확장 기능 추가

