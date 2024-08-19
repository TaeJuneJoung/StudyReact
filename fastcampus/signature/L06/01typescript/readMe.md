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

## 인터페이스(Interface)

- 선택적 속성 - ?
- 읽기전용 속성 - readonly

```ts
interface User {
  name: string;
  readonly age: number;
  isValid?: boolean;
}

const personA: User = {
  name: "A",
  age: 33,
  isValid: true,
};
personA.isValid = false;
personA.age = 22; // readonly라 변경 못함

const personB: User = {
  name: "B",
  age: 11,
};
```

### 함수 타입 - 호출 시그니처(Call Signature)

```ts
interface GetName {
  (message: string): string;
}

interface User {
  name: string;
  age: number;
  getName: GetName;
}

const personA: User = {
  name: "A",
  age: 33,
  getName(message: string) {
    console.log(message);
    return this.name;
  },
};

personA.getName("Hello");
```

### 인덱스 가능 타입 - 인덱스 시그니처(Index Signature)

```ts
// 배열
interface Fruits {
  [item: number]: string;
}
const fruits: Fruits = ["Apple", "Banana", "Cherry"];
console.log(Fruits[1]);

// 객체
interface User {
  [key: string]: unknown;
  name: string;
  age: number;
}

const personA: User = {
  name: "A",
  age: 33,
};
personA["isValid"] = true;
personA["emails"] = ["A@B.com"];
console.log(personA);

// ⭐인덱스 가능 타입
interface Payload {
  [key: string]: unknown;
}
function logValues(payload: Payload) {
  for (const key in payload) {
    console.log(payload[key]);
  }
}

interface User {
  [key: string]: unknown; // 해당 부분을 작성하지 않으면 에러가 발생
  // 인덱스 가능 타입으로 해줘야 payload가 받아서 쓸수 있는 형태
  name: string;
  age: number;
  isValid: boolean;
}

const personA: User = {
  name: "A",
  age: 33,
  isValid: true,
};

logValues(personA);
```

### 확장(상속)

```ts
interface UserA {
  name: string;
  age: number;
}

interface UserB extends UserA {
  isValid: boolean;
}

const personA: UserB = {
  name: "A",
  age: 33,
  isValid: true,
};

// 인터페이스명 동일시 확장의 역할과 같음 (+역할)
interface FullName {
  firstName: string;
  lastName: string;
}

interface FullName {
  middleName: string;
  lastName: boolean; // 에러 발생 -> 기존 위에 동일한 명의 인터페이스에 영향을 받음 -> string으로 같으면 문제 없어짐
}
```

## 타입 별칭(Alias)

```ts
type TypeA = string;
type TypeB = string | number | boolean;
type User =
  | {
      name: string;
      age: number;
      isValid: boolean;
    }
  | [string, number, boolean];

const userA: User = {
  name: "A",
  age: 33,
  isValid: true,
};

const userB: User = ["Evan", 36, false];

function someFunc(param: TypeB): TypeA {
  switch (typeof param) {
    case "string":
      return param.toUpperCase();
    case "number":
      return param.toFixed(2);
    default:
      return "Boolean";
  }
}
```

**타입 별칭을 사용할지 인터페이스를 사용할지**

기능적인 차이는 없으나 권장하는 방식은 인터페이스

타입 별칭은 객체 데이터의 타입을 만드는 구조라기보다는 다양한 타입의 별칭을 지정하는 용도라서 조금 더 사용 범위가 넓은데 인터페이스는 기본적으로 객체 데이터를 전제하기 때문에

```ts
type TypeUser = {
  name: string;
  age: number;
  isValid: boolean;
};

interface InterfaceUser {
  name: string;
  age: number;
  isValid: boolean;
}

const personA: InterfaceUser = {
  name: "A",
  age: 33,
  isValid: true,
};
```

## 함수

### 명시적 thi타입

```ts
interface Cat {
  name: string;
  age: number;
}
const cat: Cat = {
  name: "Lucy",
  age: 3,
};

function hello(this: Cat, message: string) {
  // this를 명시적으로 쓰지 않으면 Any타입으로 받기에 TypeScript에서 명시적으로 사용하는 문법적 방법
  console.log(`Hello ${this.name}, ${message}`);
}
hello.call(cat, "You are pretty awesome!");
```

### 오버로딩(Overloading)

```ts
function add(a: string, b: string): string; // 타입 선언
function add(a: number, b: number): number; // 타입 선언
function add(a: any, b: any) {
  // 함수 구현
  return a + b;
}
add("hello", "world"); // hello world
add(1, 2); // 3
add("hello", 2); // x
```

## 클래스와 접근 제어자

### 접근 제어자(Access Modifiers)

- public: 어디서나 자유롭게 접근 가능, 클래스 바디에서 생략 가능
- protected - 나와 파생된 후손 클래스 내에서 접근 가능
- private - 내 클래스에서만 접근 가능

```ts
class UserA {
  public last: string = "";
  public age: number = 0;

  constructor(public first: string = "", last: string, age: number) {
    // 외부에서 접근하게 할 때 파라미터로 public을 줘도 됨. 다만 외부 접근 허용시에 public 생략하면 안된다.
    this.first = first;
    this.last = last;
    this.age = age;
  }

  protected getAge() {
    return `${this.first} ${this.last} is ${this.age}`;
  }
}

class UserB extends UserA {
  getAge() {
    return `${this.first} ${this.last} is ${this.age}`;
  }
}

class UserC extends UserB {
  getAge() {
    return `${this.first} ${this.last} is ${this.age}`;
  }
}

const user = new UserA("June", "J", 33);
console.log(user.first);
console.log(user.last);
console.log(user.age);
```

## 제네릭

### 함수

```ts
interface Obj {
  x: number;
}
type Arr = [number, number];

function toArray(a: string, b: string): string[];
function toArray(a: number, b: number): number[];
function toArray(a: boolean, b: boolean): boolean[];
function toArray(a: Obj, b: Obj): Obj[];
function toArray(a: Arr, b: Arr): Arr[];
function toArray(a: any, b: any) {
  return [a, b];
}

console.log(
  toArray("Neo", "J"),
  toArray(1, 2),
  toArray(true, false),
  toArray({ x: 1 }, { x: 2 }),
  toArray([1, 2], [3, 4])
);

// 제너릭 적용
function toArray<T>(a: T, b: T): T[] {
  return [a, b];
}

console.log(
  toArray<string>("Neo", "J"),
  toArray<number>(1, 2),
  toArray<boolean>(true, false),
  toArray({ x: 1 }, { x: 2 }),
  toArray<Arr>([1, 2], [3, 4])
);
```

### 클래스

```ts
class User<P> {
  constructor(public payload: P) {}
  getPayload() {
    return this.payload;
  }
}

interface UserAType {
  name: string;
  age: number;
  isValid: boolean;
}

interface UserBType {
  name: string;
  age: number;
  emails: string[];
}

const person = new User({
  name: "J",
  age: 33,
  isValid: true,
  emails: [],
});

const neo = new User({
  name: "Neo",
  emails: ["A@B.com"],
});

console.log(person.getPayload());
console.log(neo.getPayload());
```

### 인터페이스

```ts
interface MyData<T> {
  name: string;
  value: T;
}

const dataA: MyData<string> = {
  name: "Data A",
  value: "Hello World",
};
const dataB: MyData<number> = {
  name: "Data B",
  value: 1234,
};
const dataC: MyData<boolean> = {
  name: "Data C",
  value: false,
};
const dataD: MyData<number[]> = {
  name: "Data D",
  value: [1, 2, 3, 4],
};

interface MyData<T extends string | number> {
  // 제약조건
  name: string;
  value: T;
}
```

## 패키지의 타입 선언

```ts
import _ from "lodash";

const str = "the brown fox jumps over the lazy dog.";

console.log(_.camelCase(str));
console.log(_.snakeCase(str));
```

lodash 라이브러리를 설치하기 위해서

```bash
$ npm install lodash
```

이렇게 해도 TS에서 사용하기 위해서는 @type 설치를 하거나 정의를 내려줘야 하기에 에러가 발생한다.

**라이브러리명.d.ts**

```ts
declare module "lodash" {
  interface Lodash {
    camelCase: (str: string) => string;
    snakeCase: (str: string) => string;
  }

  const _: Lodash;
  export default _;
}
```

이름을 기반으로 찾는데 이름을 다르게 했다면,

```ts
/// <reference path="./main.d.ts" />
import _ from "lodash";

const str = "the brown fox jumps over the lazy dog.";

console.log(_.camelCase(str));
console.log(_.snakeCase(str));
```

`///`: 삼중 슬래시 지시자

**정의된 타입 설치**

https://github.com/DefinitelyTyped/DefinitelyTyped

```bash
$ npm install --save-dev @types/lodash
```

```json
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "ESNext",
    "moduleResolution": "Node",
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM"],
    "strict": true,
    "typeRoots": ["./node_modules/@types"]
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

tsconfig.json 설정에 `"typeRoots": ["./node_modules/@types"]` 내용이 작성하지 않아도 default로 적용되어 있다.

## tsconfig.json 구성 옵션

⭐TODO: 해당 부분은 다시 듣고 정리 한 번 더 할 것!

- compilerOptions: 컴파일러 옵션 지정, JavaScript로 변환하기 위해서 어떤 옵션들이 세부적으로 또 필요한지 결정해주는 옵션
  - target: 컴파일될 ES(JS)버전 명시 - ES2015권장
  - module: 모듈 시스템 지정 - CommonJS, AMD, ESNext
  - moduleResolution: 모듈 해석 방식 지정 - Node, Classic
  - esModuleInterop: ESM모듈 방식 호환성 활성화 여부
  - isolatedModules: 모든 파일을 모듈로 컴파일, import 혹은 export 키워드 필수
  - baseUrl: 모듈 해석에 사용할 기준 경로 지정
  - typeRoots: 컴파일러가 참조할 타입 선언(d.ts)의 경로를 지정
  - lib: 컴파일에서 사용할 라이브러리 지정 - ESNext, DOM
  - strict: 더 엄격한 타입 검색 활성화
  - noImplicitAny: 암시적 any타입 검사 활성화
  - noImplicitThis: 암시적 this타입 검사 활성화
  - strictNullChecks: 엄격한 Nullish타입 검사 활성화
  - strictFunctionTypes: 엄격한 함수의 매개변수 타입 검사 활성화
  - strictPropertyInitialization: 엄격한 클래스의 속성 초기화 검사 활성화
  - strictBindCallApply: 엄격한 Bind, Call, Apply 메소드의 인수 검사 활성화
- include: 컴파일 할 파일 경로 목록
- exclude: 컴파일에서 제외할 파일 경로 목록
