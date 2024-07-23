# JS

## EMCA스크립트

### 템플릿 리터럴

`(백틱)을 써서 변수를 사용하는 방식

#### 부동 소수점 오류

0.1 + 0.2 = 0.3000000000004 이런식으로 나오게 되는데 이 부분을 처리하기 위해서 `.toFixed(1)`을 사용하면 된다.

주의할 점은 반환되는 데이터 타입이 문자타입이라는 것이다.

`Number((0.1 + 0.2).toFixed(1))`

### 참조형 Object

```js
// 생성자 함수를 통한 객체 데이터 생성
const user = new Object();
user.name = "June";
user.age = 33;

console.log(user);

// 함수를 통한 객체 데이터 생성
function User() {
  this.name = "June";
  this.age = 33;
}
const user = new User();

console.log(user);

// 중괄호 기호를 통한 객체 데이터 생성
const user = {
  name: "June",
  age: 33,
};

console.log(user.name); // 점 표기법
console.log(user["name"]); // 대괄호 표기법
```

객체데이터에서 속성의 이름(키)는 고유하다. 각각의 키는 순서가 따로 존재하지 않는다.

```js
const userA = {
  name: "june",
  age: 33,
};

const userB = {
  name: "B",
  age: 1,
  parent: userA,
};

userB.parent.age = 36;

console.log(userA.age); // 36
```

### 데이터 타입 확인

```js
typeof null // object
typeof []   // object
typeof {}   // object

// null과 배열, 객체를 어떻게 구별할 것인가?

[].constructor === Array
{}.constructor === Object
// null은 constructor가 없음

Object.prototype.toString.call(null).slice(8, -1) === 'Null'

// Object.prototype을 이용한 타입 체크 함수 만들기
function typeCheck(data) {
  return Object.prototype.toString.call(data).slice(8, -1);
}

typeCheck(null) // Null
typeCheck([]) // Array
typeCheck({}) // Object
typeCheck('Hello') // String
```

파이썬과 다르게 비어있는 배열과 객체에 대해서 참/거짓 값이 참이 나옴.

```js
!![]; // true
!!{}; // true
```

### 논리 연산자

AND 연산자

```js
console.log(0 && 1 && 2); // 0
console.log("A" && "B" && "C"); // 'C'
console.log("A" && "B" && ""); //
```

### Nullish 병합, 삼항 연산자

```js
const n = 0;

const num1 = n || 3; // 3

// 원하는 것은 null의 값이면 3을 넣고 싶은 것이고 0일 때는 0이 들어가게 하고 싶다.
/* Nullish 병합 연산자 사용 */
const num = n ?? 3; // 0  -> null과 undefined만 걸러짐
```

### 전개 연산자(Spread Operator)

```js
// 배열 전개 연산
const a = [1, 2, 3];
const b = [4, 5, 6];

const c = a.concat(b);
const d = [...a, ...b];

// 객체 전개 연산
const a = { x: 1, y: 2 };
const b = { y: 3, z: 4 };

const c = Object.assign({}, a, b);
const d = { ...a, ...b };

function fn(x, y, z) {
  console.log(x, y, z);
}

const a = [1, 2, 3];
fn(...a);
```

### 구조 분해 할당(Destructuring assignment)

```js
/* 배열의 구조 분해 할당 */
const arr = [1, 2, 3];
const [a, b, c] = arr;

// 만약 2와 3의 값만 받기 원한다면
const [, b, c] = arr;

// 나머지 값을 뒤에 값이 다 받기 위해서는?
const [a, ...rest] = arr;

/* 객체의 구조 분해 할당 */
const obj = {
  a: 1,
  b: 2,
  c: 3,
};

// 사용하고자 하는 키 값만 받아서 사용
const { a, b: x = 5 } = obj; // b의 값이 없으면 초기값 5, 있으면 있는 값으로 -> b: x를 이용하여 변수 이름을 x로 변경

// 전개 연산자를 이용해 나머지 받기
const obj2 = {
  a: 1,
  b: 2,
  c: 3,
  x: 7,
  y: 100,
};

const { x, ...rest } = obj2;
```

### 선택적 체이닝

```js
const user = null;

console.log(user?.name);
```

`user.name`이었다면 SyntaxError가 발생하는데 프로그램에서 이렇게 문제가 발생하면 강제 종료되거나 문제가 생기니 문법적으로 `?.` 선택적 체이닝을 통해 접근이 안되면 undefined가 나와 종료 없이 가정문 방식으로 처리할 수 있다.

### for 반복문

#### for of 반복문

```js
const fruits = ["Apple", "Banana", "Cherry"];

for (const fruit of fruits) {
  console.log(fruit);
}

const users = [
  {
    name: "A",
    age: 11,
  },
  {
    name: "B",
    age: 22,
  },
  {
    name: "C",
    age: 33,
  },
];

for (const user of users) {
  console.log(user);
}
```

#### for in 반복문

```js
const user = {
  name: 'A',
  age: 11,
  isValid: true,
  email: A@B.C
}

for (const key in user) {
  console.log(key, user[key])
}
```
