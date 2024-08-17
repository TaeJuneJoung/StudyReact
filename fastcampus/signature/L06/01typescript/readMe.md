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

## 타입 종료

- 문자
- 숫자
- Boolean
- Null / Undefined
- 배열

```ts
const fruits: string[] = ["Apple", "Banana", "Cherry"];
const numbers: number[] = [1, 2, 3, 4, 5, 6, 7];
const union: (string | number)[] = ["Apple", 1, 2, "Banana", 3];
```

- 객체

```ts
const userA: {
  name: string;
  age: number;
  isValid: boolean;
} = {
  name: "Name",
  age: 33,
  isValid: true,
};

interface User {
  name: string;
  age: number;
  isValid: boolean;
}

const userB: User = {
  name: "Neo",
  age: 22,
  isValid: false,
};
```

- 함수

```ts
const add: (x: number, y: number) => number = function (x: number, y: number) {
  return x + y;
};
const a: number = add(1, 2);

// 생략형
const add = function (x: number, y: number): number {
  return x + y;
};
```

- Any: 어떠한 타입도 가능. TS를 쓰는 의미를 찾기 위해서는 최소화하는 게 낫다.
- Unknown: 정확하게 타입을 알 수 없는 상태이다.

```ts
const a: any = 123;
const u: unknown = 123;

// any: 문제 없이 작동
const any: any = a;
const boo: boolean = a;
const num: number = a;
const arr: string[] = a;
const obj: { x: string; y: number } = a;

// unknown any 빼고는 에러발생됨
const any: any = u;
const boo: boolean = u; // 에러
const num: number = u; // 에러
const arr: string[] = u; // 에러
const obj: { x: string; y: number } = u; // 에러
```

- Tuple: 배열과는 다르게 튜플 경우에는 온전하게 순서와 개수가 정해져 있는 배열의 아이템을 만들 때 유용하게 사용

```ts
const tuple: [string, number, boolean] = ["a", 1, false];
const users: [number, string, boolean][] = [
  [1, "Neo", true],
  [2, "Evan", false],
  [3, "Lewis", true],
];
```

- Void
- Never: 절대 발생하지 않을 데이터 타입

```ts
const nev: [] = []; // [never]로 자동으로 들어가는 것임
nev.push(3); // never타입이기에 인수로 들어갈 수 없음
```

- Union
  여러 형태의 타입을 지정해야할 때 `|`을 이용하여 사용할 수 있다.

```ts
let union: string | number;
union = "Hello type!";
union = 123;
union = false; // Error

// 배열일 때 소괄호() 안에 표기
let arrayUnion: (string | number)[];
```

- Intersection: `&` 그리고 연산자와 유사

주로 DB데이터에서 연결된 다른 테이블의 데이터를 보여줄 때 사용할 것으로 보임

```ts
interface User {
  name: string;
  age: number;
}

interface Validation {
  isValid: boolean;
}

const person: User & Validation = {
  name: "Name",
  age: 33,
  isValid: true,
};
```

## 타입 추론(Inference)

1. 초기화된 변수
2. 기본값이 설정된 매개 변수
3. 반환 값이 있는 함수

## 타입 및 할당 단언(Assertion)

단언: 주저하지 아니하고 딱 잘라 말함

- 단언 키워드 - as
- Non-null 단언 연산자 - !

### 타입 단언

```ts
// document.querySelector에 body태그가 무조건 있어서 null이 아닌 HTMLBodyElement타입이 들어올 것이라고 단언
const el = document.querySelector("body") as HTMLBodyElement;
el.textContent = "Hello world";

const el = document.querySelector("body");
el!.textContent = "Hello world"; // null이 아니라고 단언

// 타입 가드
const el = document.querySelector(".title");
if (el) {
  el.textContent = "Hello world";
}

function getNumber(x: number | null | undefined) {
  return Number((x as number).toFixed(2)); // 코드상으론 잘못된 코드 -> null이나 undefined에 대한 오류를 막아주진 못함
}

function getNumber(x: number | null | undefined) {
  return Number(x!.toFixed(2)); // 코드상으론 잘못된 코드 -> null이나 undefined에 대한 오류를 막아주진 못함
}

// 타입 가드
function getNumber(x: number | null | undefined) {
  if (x) {
    return Number(x.toFixed(2));
  }
}

getNumber(null); // null에서 toFixed 함수 접근 안됨

function getValue(x: string | number, isNumber: boolean) {
  if (isNumber) {
    return Number((x as number).toFixed(2));
  }
  return (x as string).toUpperCase();
}
getValue("hello world", false);
getValue(3.1415, true);
```

### 할당 단언

```ts
let num!: number;
console.log(num);

num = 123;
```

## 타입 가드(Guards)

```ts
function logText(el: Element) {
  console.log(el.textContent);
}

const h1El = document.querySelector("h1");
if (h1El instanceof HTMLHeadingElement) {
  logText(h1El);
}

function add(val: string | number) {
  let res = "Result => ";
  if (typeof val === "number") {
    res += val.toFixed(2);
  } else {
    res += val.toUpperCase();
  }
  console.log(res);
}

add(3.141592);
add("hello world");
```
