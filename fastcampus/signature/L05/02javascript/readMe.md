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

## 함수

### 함수 선언과 표현 그리고 호이스팅

```js
// 호이스팅
hello1(); // 호이스팅 이뤄짐
hello2(); // 정의하라고 에러발생됨 (함수 표현식은 호이스팅 안됨)

// 함수 선언
function hello1() {
  console.log("Hello");
}

// 함수 표현식
const hello2 = function () {
  console.log("Hello");
};
```

### 나머지 매개변수

```js
function sum(...rest) {
  console.log(arguments); // 유사 배열
  return rest.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
}

console.log(sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
```

`arguments`를 이용하면 유사 배열 형태로 값들을 받아올 수는 있으나, `reduce`와 같은 함수들을 사용할 수 없다.

직관적이지도 않은 점도 한몫 한다.

### 화살표 함수

```js
const arr1 = (a, b) => {
  return a + b;
};

// 중괄호와 return 키워드를 생략하고 작성 가능(단, 중간 다른 로직 있으면 안됨)
const arr2 = (a, b) => a + b;

const a = () => {
  return { a: 1 };
};
// 이와 같은 경우는 안됨. 중괄호 기호가 함수의 영역 중괄호인지 객체의 중괄호인지 모호하기에 문제가 생김
const b = () => {
  a: 1;
};

// 이런 경우 () 소괄호를 묶어줌으로서 처리해야함
const c = () => ({ a: 1 });
```

### 즉시 실행 함수(IIFE, Immediately-Invoked Function Expression)

```js
((a, b) => {
  console.log("Hello");
  console.log(a, b);
})(3, 5);

// 1. (F)()
// 2. (F())
// 3. !F()
// 4. +F()
// 5. ()()

// 코드 난독화. 인자와 매개변수를 다르게 해서 즉시 실행
((a, b) => {
  console.log(a.innerWidth);
  console.log(b.body);
})(window, document);
```

### 콜백(Callback)

```js
const sum = (a, b, callback) = {
  setTimeout(() => {
    // return a + b; // 해당 값을 어떻게 받을 것인가?
    callback(a + b)
  }, 1000)
}

sum(1, 2, value => {
  console.log(value)
})
```

위와 같은 방도를 이용한 loading 메세지 1초 보여주고 이미지 보여주는 로직

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script type="module" defer src="./main.js"></script>
  </head>
  <body>
    <div class="container">
      <h1>Loading...</h1>
    </div>
  </body>
</html>
```

```js
const loadImg = (url, callback) => {
  const imgEl = document.createElement("img");
  imgEl.src = url;
  imgEl.addEventListener("load", () => {
    setTimeout(() => {
      callback(imgEl);
    }, 1000);
  });
};

const $containerEl = document.querySelector(".container");
const url = "https://www.gstatic.com/webp/gallery/4.jpg";
loadImg(url, (imgEl) => {
  $containerEl.innerHTML = "";
  $containerEl.append(imgEl);
});
```

### 호출 스케줄링(Scheduling a function call)

```js
const timeout = setTimeout(() => {
  console.log("Hello");
}, 1000);

clearTimeout(timeout); // setTimeout clear시킴 -> 1초뒤 콘솔에 안나옴. 이벤트에 적용하면 이벤트 적용 될 때 안되게 처리할 수 있음

// setInterval도 동일함. clearInterval
```

### this

- 일반 함수의 this는 호출 위치에서 정의
- 화살표 함수의 this는 자신이 선언된 함수(렉시컬) 범위에서 정의

> **렉시컬(Lexical)**
>
> : 함수가 동작할 수 있는 유효한 범위

```js
function user() {
  this.firstName = "Neo";
  this.lastName = "Anderson";

  return {
    firstName: "Heropy",
    lastName: "Park",
    age: 85,
    getFullName() {
      return `${this.firstName} ${this.lastName}`;
    },
  };
}

const u = user();
console.log(u.getFullName());

const lewis = {
  firstName: "Lewis",
  lastName: "Yang",
};

// lewis에 없는 getFullName 사용하는 방안
console.log(u.getFullName.call(lewis));
```

함수 생성자 안에 쓰이는 함수는 메서드로서 `: function`을 생략하고도 사용할 수 있다.

```js
// 1. 일반적 방식
getFullName: function() {};
// 2. 메서드 문법으로 생략
getFullName() {};
// 3. 화살표 함수 방식
getFullName: () => {};
```

단, 일반 함수와 화살표 함수의 `this`인식 차이로 인하여 값이 달라질 수 있다는 점 염두해야한다.

```js
const timer = {
  title: "TIMER!",
  timeout() {
    console.log(this.title);
    setTimeout(function () {
      console.log(this.title);
    }, 1000);
  },
};

timer.timeout();

// setTimeout callback함수로 정의된 부분에서 일반함수의 this는 호출 위치에서 정의되기에 undefined가 나오게 된다.

만약 함수 내부에 또 다른 함수가 들어있는 구조라면 일반 함수보다는 화살표 함수를 쓰는 것이 훨씬 더 적합하다.

setTimeout함수의 첫 번째 인수로 사용되는 callback화살표 함수는 그 내부에서 사용하는 this키워드가 선언된 함수 범위에서 정의가 된다. this키워드를 사용하는 이 부분에 callback함수를 감싸고 있는 또 다른 함수는 timeout이라는 함수가 감싸고 있다. 그래서 timeout 함수가 가지고 있는 this키워드는 결과적으로 timer라는 객체 데이터이고 거기에서의 this와 callback에서의 this는 사실상 같은 것이 된다.
```

## 클래스

JS는 Prototype언어

```js
// 선언하지 않은 함수 사용하는 법1
const heropy = {
  firstName: "heropy",
  lastName: "Park",
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  },
};

const neo = {
  firstName: "Neo",
  lastName: "Anderson",
};

console.log(heropy.getFullName());
console.log(heropy.getFullName.call(neo));

// 선언하지 않은 함수 사용하는 법2
function User(first, last) {
  this.firstName = first;
  this.lastName = last;
}
User.prototype.getFullName = function () {
  // 일반함수 사용해야함. 화살표 함수 사용하면X
  return `${this.firstName} ${this.lastName}`;
};

// 3. 클래스 문법
class User {
  constructor(first, last) {
    this.firstName = first;
    this.lastName = last;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const heropy = new User("Heropy", "Park");
const neo = new User("Neo", "Anderson");
```

### Getter, Setter

```js
class User {
  constructor(first, last) {
    this.firstName = first;
    this.lastName = last;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(value) {
    [this.firstName, this.lastName] = value.split(" ");
  }
}

const heropy = new User("Heropy", "Park");
console.log(heropy.fullName);

heropy.fullName = "Neo Anderson";
console.log(heropy);
```

### 정적 메서드

`Array.prototype.includes()`와 `Array.isArray()`를 보면 앞에는 prototype이 있고 isArray는 prototpye없이 쓰이는데 어떠한 차이가 있는가?

prototype없이 쓰이면 정적 메서드.

```js
class User {
  constructor(first, last) {
    this.firstName = first;
    this.lastName = last;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  static isUser(user) {
    return user.firstName && user.lastName ? true : false;
  }
}

const heropy = new User("Helropy", "Park");

console.log(User.isUser(heropy));
```

정적 메서드는 클래스로 바로 접근은 가능하나 인스턴스 객체에서는 접근할 수 없다.

### 상속과 instanceof

```js
class Vehicle {
  constructor(acceleration = 1) {
    this.speed = 0;
    this.aceeleration = acceleration;
  }

  accelerate() {
    this.speed += this.acceleration;
  }
  decelerate() {
    if (this.speed <= 0) {
      console.log("STOP");
      return;
    }
    this.speed -= this.acceleration;
  }
}

class Bicycle extends Vehicle {
  constructor(price = 100, acceleration) {
    super(acceleration);
    this.price = price;
    this.wheel = 2;
  }
}

const bicycle = new Bicycle(300);
bicycle.accelerate();
bicycle.accelerate();
console.log(bicycle);
console.log(bicycle instanceof Bicycle);
console.log(bicycle instanceof Vehicle);

class Car extends Bicycle {
  constructor(license, price, acceleration) {
    super(price, acceleration);
    this.license = license;
    this.wheel = 4;
  }

  // Overriding
  accelerate() {
    if (!this.license) {
      console.error("무면허!");
      return;
    }
    this.speed += this.acceleration;
    console.log("가속:", this.speed);
  }
}

const car = new Car();

class Boat extends Vehicle {
  constructor(price, acceleration) {
    super(acceleration);
    this.price = price;
    this.motor = 1;
  }
}
```

## 표준 내장 객체

### 문자(String)

- length
- includes()
  `includes(문자, 시작 인덱스)`로 반환값은 boolean

- indexOf()
  `indexOf(문자)` 반환값은 인덱스 (없다면 -1)

- padEnd()
  : 대상 문자의 길이가 지정된 길이보다 작으면, 주어진 문자를 지정된 길이까지 끝에 붙여 새로운 문자를 반환

```js
const str = "1234567";

console.log(str.padEnd(10, "0")); // 1234567000
```

padStart()함수는 앞에 붙여지는 방식

- replace()

: 대상 문자에서 패턴(문자, 정규식)과 일치하는 부분을 교체한 새로운 문자를 반환합니다.

```js
const str = "Hello, Hello?!";

console.log(str.replace("Hello", "Hi")); // Hi, Hello?!
console.log(str.replace(/Hello/g, "Hi")); // Hi, Hi?!
```

- slice()
  : 대상 문자의 일부를 추출해 새로운 문자를 반환
  두번째 인수 직전까지 추출하고, 두 번째 인수를 생략하면 대상 문자의 끝까지 추출

```js
const str = "Hello world!";

console.log(str.slice(0, 5)); // Hello
console.log(str.slice(6, -1)); // world
console.log(str.slice(6)); // world!
```

- split()
  : 대상 문자를 주어진 구분자로 나눠 배열로 반환

```js
const str = "Apple, Banana, Cherry";

console.log(str.split(", ")); // [Apple, Banana, Cherry]

// 문자열을 거꾸로 출력하는 방법
console.log(str.split("").reverse().join(""));
```

- toLowerCase()
  : 대상 문자를 영어 소문자로 변환해 새로운 문자로 반환

toUpperCase()는 이의 반대로 대문자로 반환

- trim()
  : 대상 문자의 앞뒤 공백 문자(space, tab 등)를 제거한 새로운 문자 반환

### 숫자(Number)

- toFixed()
  : 숫자를 지정된 고정 소수점 표기(자릿수)까지 표현하는 문자로 반환

```js
const num = 3.141592;

console.log(num.toFixed(2)); // 3.14 (문자 타입)
console.log(parseFloat(num.toFixed(2))); // 3.14 (숫자 타입)
```

- toLocaleString()
  : 숫자를 현지 언어 형식의 문자로 반환

```js
const num = 1000000;

console.log(num.toLocaleString()); // 1,000,000
```

- Number.isInteger()
  : 숫자가 정수(Integer)인지 확인

- Number.isNaN()
  : 주어진 값이 NaN인지 확인

- Number.parseInt() 또는 parseInt()
  :`Number.parseInt(숫자/문자, radix)`주어진 값(숫자/문자)를 파싱해 특정 진수(radix)의 정수로 반환

parseFloat()는 부동소수점 실수로 반환

### 수학(Math)

- Math.abs()
  : 주어진 숫자의 절대값 반환

- Math.ceil()
  : 주어진 숫자 올림해 정수 반환

Math.floor()는 내림해 정수 반환

Math.round()는 반올림 정수 반환

- Math.max()
  : 주어진 숫자 중 가장 큰 숫자 반환

Math.min()은 가장 낮은 숫자 반환

- Math.pow()
  : `Math.pow(밑, 지수)` 주어진 숫자의 거듭제곱한 값을 반환

- Math.random()
  : 숫자 0 이상 1 미만의 난수 반환

### 날짜(Date)

```js
const d1 = new Date(2022, 11, 16, 12, 57, 30);
console.log(d1); // Fri Dec 16 2022 12:57:30 GMT+0900 (한국 표준시)

const d2 = new Date("Fri Dec 16 2022 12:57:30 GMT+0900 (한국 표준시)");
console.log(d2); // Fri Dec 16 2022 12:57:30 GMT+0900 (한국 표준시)
console.log(d2.getFullYear()); // 2022

d2.setFullYear(2024);
console.log(d2); // Fri Dec 16 2024 12:57:30 GMT+0900 (한국 표준시)

// JS에서는 월에 대해서 zero-base numbering을 사용하여 0이면 1월, 1이면 2월...
d2.setMonth(0);
console.log(d2.getMonth()); // 0

d2.setDate(26);
console.log(d2.getDate()); // 26

d2.setHours(16);
console.log(d2.getHours()); // 16

d2.setMinutes(7);
console.log(d2.getMinutes()); // 7

d2.setSeconds(57);
console.log(d2.getSeconds()); // 57

// getDay() : 날짜 인스턴스의 '요일'을 반환
const day = d2.getDay();
// 0: 일요일, 1: 월요일, ... 6: 토요일

// getTime() / setTime()
// : 1970-01-01 00:00:00 (유닉스 타임)부터 경과한 날짜 인스턴스의 밀리초(ms)로 변환하거나 지정
const date = new Date();
console.log(date.getTime()); // 1721977979960
console.log(date); // Fri Jul 26 2024 16:12:59 GMT+0900 (한국 표준시)

Date.prototype.isAfter = function (date) {
  const a = this.getTime();
  const b = date.getTime();

  return a > b;
};

const d1 = new Date(1700000000000);
const d2 = new Date(1800000000000);

console.log(d1.isAfter(d2)); // false
console.log(d2.isAfter(d1)); // true

// Date.now() : 현재 날짜시간을 ms로 반환
```

### 배열

- length
- at() : 다음 배열을 인덱싱. 음수 값을 쓰면 뒤에서부터 인덱싱. cf) 일반적 인덱싱에서는 마이너스 인덱싱 안됨.
- concat() : 대상 배열과 주어진 배열을 병합해 새로운 배열을 반환

```js
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = arr1.concat(arr2);
const arr4 = [...arr1, ...arr2];
```

- every() : 대상 배열의 모든 요소가 콜백 테스트에서 참(Truthy)을 반환하는지 확인

```js
const arr = [1, 2, 3, 4];
const isValid1 = arr.every((item) => item < 5); // true
const isValid2 = arr.every((item) => item < 3); // false
```

- filter() : 주어진 콜백 테스트를 통과하는 모든 요소를 새로운 배열로 반환. 모두 통과 못할 시 빈 배열 반환

```js
const numbers = [1, 20, 7, 104, 0, 58];
const filteredNumbers = numbers.filter((number) => number > 30);

console.log(filteredNumbers); // [104, 58]

const users = [
  { name: "A", age: 33 },
  { name: "B", age: 22 },
  { name: "C", age: 11 },
];
const adults = users.filter((user) => user.age >= 19);
console.log(adults); // [{name: 'A', age: 33}, {name: 'B', age: 22}]
```

- find() : 대상 배열에서 콜백 테스트를 통과하는 첫 번째 요소를 반환. 없으면 `undefined`

```js
const arr = [5, 8, 130, 12, 44];
const foundItem = arr.find((item) => item > 10);

console.log(foundItem); // 130
```

- findIndex() : 대상 배열에서 콜백 테스트를 통과하는 첫 번째 요소의 인덱스 반환. 없으면 -1

- flat() : 대상 배열의 모든 하위 배열을 지정한 깊이(Depth)까지 이어붙인 새로운 배열을 생성 (default: 1)

```js
const arr = [
  1,
  2,
  [3, 4],
  [
    [5, 6],
    [7, 8],
  ],
];

console.log(arr.flat()); // [1, 2, 3, 4, Array(2), Array(2)] -> 복잡한 구조의 배열에서는 flat을 다 하진 못함.
// 이렇게 복잡한 것들을 해결하기 위해 loadsh flatten함수를 사용하는 것으로 보임.

console.log(arr.flat(2)); // 이렇게 쓰면 해결됨.

// [1,2,[3,4], [[5,6], [7,8], [[1,2], [[3,4]]]]] 이렇게 더 복잡한 것도 depth를 크게 주니 해결됨.
// TODO: depth 값을 크게 주면 그냥 다 되는거 아닌가? 성능 저하나 다른 문제가 있나?
```

얼마나 깊이가 깊은지는 모르나 다 flat하게 1차원 배열로 나타내고 싶다면 `.flat(Infinity)`를 이용하면 됨.

- forEach() : 대상 배열의 길이만큼 주어진 콜백을 실행

```js
const arr = [11, 22, 33];
arr.forEach((item) => console.log(item * item));
```

- includes() : 대상 배열의 특정 요소를 포함하고 있는지 확인

```js
const arr = [1, 2, 3];
console.log(arr.includes(7)); // false

const users = [
  { name: "A", age: 33 },
  { name: "B", age: 22 },
  { name: "C", age: 11 },
];

console.log(users.includes({ name: "A", age: 33 })); // false

const userA = users[0];
console.log(users.includes(userA)); // true
```

JS는 데이터타입이 크게 원시형과 참조형으로 나뉘어져 있다.

참조형에는 객체, 배열, 함수가 있다.

참조형은 데이터의 생김새가 같아도 메모리 주소값이 달라 다른 데이터일 수 있다.

- join() : 대상 배열의 모든 요소를 구분자로 연결한 문자를 반환

- map() : 대상 배열의 길이만큼 주어진 콜백을 실행하고, 콜백의 반환 값을 모아 새로운 배열을 반환

```js
const numbers = [1, 2, 3, 4, 5];
const newNumbers = numbers.map((item) => item * 2);

console.log(newNumbers); // [2, 4, 6, 8, 10]

const users = [
  { name: "A", age: 33 },
  { name: "B", age: 22 },
  { name: "C", age: 11 },
];

const newUsers = users.map((user) => {
  return {
    ...user,
    isValid: true,
    email: null,
  };
});

/* 다음과 같이 작성할 수도 있음 */
const newUsers = users.map((user) => ({
  ...user,
  isValid: true,
  email: null,
}));

console.log(newUsers);
```

- pop() : 대상 배열에서 마지막 요소를 제거하고 그 요소를 반환. ⚠️대상 배열 원본이 변경된다.
- push() : 대상 배열의 마지막에 하나 이상의 요소를 추가하고, 배열의 새로운 길이를 반환. ⚠️대상 배열 원본이 변경된다.

```js
const arr = [1, 2, 3];
const plusArr = [5, 6, 7];

const newLength = arr.push(4);
console.log(newLength); // 4
console.log(arr); // [1,2,3,4]

arr.push(...plusArr);
console.log(arr); // [1,2,3,4,5,6,7]
```

- reduce() : 대상 배열의 길이만큼 주어진 콜백을 실행하고, 마지막에 호출되는 콜백의 반환 값을 반환. 각 콜백의 반환 값은 다음 콜백으로 전달됨.

```js
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, cur) => {
  return acc + cur;
}, 0);

console.log(sum);

const users = [
  { name: "A", age: 33 },
  { name: "B", age: 22 },
  { name: "C", age: 11 },
];

// 총 나이 계산
const totalAge = users.reduce((acc, cur) => acc + cur.age, 0);
console.log(totalAge);

const names = users
  .reduce((acc, cur) => {
    acc.push(cur.name);
    return acc;
  }, [])
  .join(", ");
console.log(names);
```

- reverse() : 대상 배열의 순서를 반전된 배열 반환. ⚠️대상 배열 원본이 변경된다.

```js
const arr = ["A", "B", "C"];
const reversed = arr.reverse();

console.log(reversed); // ['C', 'B', 'A']
console.log(arr); // ['C', 'B', 'A']
```

- shift() : 대상 배열에서 첫 번째 요소를 제거하고, 제거된 요소를 반환. ⚠️대상 원본이 변경된다.

pop은 마지막 요소를 반환하면서 제거했다면 shift는 첫 번째 요소를 반환하면서 제거.

```js
const arr = ["A", "B", "C"];

console.log(arr.shift()); // A
console.log(arr); // ['B', 'C']
```

- slice() : 대상 배열의 일부를 추출해 새로운 배열을 반환. 두번쨰 인수 직전까지 추출하고, 두번째 인수를 생략하면 대상 배열의 끝까지 추출.

```js
const arr = ["A", "B", "C", "D", "E", "F", "G"];

console.log(arr.slice(4, -1)); // ['E', 'F']
console.log(arr.slice(4)); // ['E', 'F', 'G']
```

- some() : 대상 배열의 어떤 요소라도 콜백 테스르를 통과하는지 확인. 하나도 조건에 참이 아니여야 false값 반환.

```js
const arr = [1, 2, 3, 4, 5];
const isValid = arr.some((item) => item > 3);

console.log(isValid); // true
```

- sort() : 대상 배열을 콜백의 반환 값(음수, 양수, 0)에 따라 정렬. 콜백을 제공하지 않으면, 요소를 문자열로 반환하고 유니코드 코드 포인트 순서로 정렬. ⚠️대상 배열 원본이 변경된다.

```js
const numbers = [4, 17, 2, 103, 3, 1, 0];

numbers.sort();
console.log(numbers); // [0, 1, 103, 17, 2, 3, 4]

numbers.sort((a, b) => a - b);
console.log(numbers); // [0, 1, 2, 3, 4, 17, 103]

numbers.sort((a, b) => b - a);
console.log(numbers); // [103, 17, 4, 3, 2, 1, 0]
```

- splice() : 대상 배열에 요소를 추가하거나 삭제하거나 교체. ⚠️대상 배열 원본이 변경된다.

`splice(인덱스, 삭제갯수, 요소)`

```js
const arr = ["A", "B", "C"];
arr.splice(2, 0, "X");

console.log(arr); // ['A', 'B', 'X', 'C']

arr.splice(1, 1); // B 제거 deleteCount를 1이 아닌 2 작성시에 B뒤에 X까지 삭제됨.

console.log(arr); // ['A', 'X', 'C']

arr.splice(1, 2, "x", "y"); // 'X'와 'C' 제거 후에 x, y 추가

console.log(arr); // ['A', 'x', 'y']

arr.splice(0, 1, "a"); // 'A'를 'a'로 교체

console.log(arr); // ['a', 'x', 'y']
```

- unshift() : 새로운 요소를 대상 배열의 맨 앞에 추가하고 새로운 배열의 길이 반환. ⚠️대상 배열 원본이 변경된다.

```js
const arr = ["A", "B", "C"];

console.log(arr.unshift("X")); // 4
console.log(arr); // ['X', 'A', 'B', 'C']
```

- Array.from() : 유사 배열(Array-like)을 실제 배열로 반환

```js
const arrayLike = {
  0: "A",
  1: "B",
  2: "C",
  length: 3,
};

console.log(arrayLike.constructor === Array); // false
console.log(arrayLike.constructor === Object); // true

Array.from(arrayLike).forEach((item) => console.log(item)); // 객체 타입인데 배열 forEach를 사용하고 있음.
```

- Array.isArray() : 배열 데이터인지 확인

```js
const array = ["A", "B", "C"];
const arrayLike = {
  0: "A",
  1: "B",
  2: "C",
  length: 3,
};

console.log(Array.isArray(array)); // true
console.log(Array.isArray(arrayLike)); // false
```

### 객체

- Object.assign() : 하나 이상의 출처(Source) 객체로부터 대상(Target) 객체로 속성을 복사하고 대상 객체를 반환

```js
const target = { a: 1, b: 2 };
const source1 = { b: 3, c: 4 };
const source2 = { c: 5, d: 6 };
const result = Object.assign(target, source1, source2);

console.log(target); // {a: 1, b: 3, c: 5, d: 6}
console.log(result); // {a: 1, b: 3, c: 5, d: 6}
console.log(source1); // { b: 3, c: 4 }
console.log(source2); // { c: 5, d: 6 }

// 만약 원본데이터에 영향을 안받고 싶다면 대상 객체를 빈 객체를 넣어주면 된다.
// ex) Object.assign({}, source1, source2);

// Object.assign()은 전개연산자를 통해서 동일한 역할을 할 수 있다.
const result = {
  ...target,
  ...source1,
  ...source2,
};
```

- Object.entries() : 주어진 객체의 각 속성과 값으로 하나의 배열 만들어 요소로 추가한 2차원 배열을 반환

```js
const user = {
  name: "A",
  age: 33,
  isValid: true,
  email: "A@B.C",
};

console.log(Object.entries(user));

for (const [key, value] of Object.entries(user)) {
  console.log(key, value);
}
```

- Object.keys() : 주어진 객체의 속성 이름을 나열한 배열을 반환

```js
const user = {
  name: "A",
  age: 33,
  isValid: true,
  email: "A@B.C",
};

console.log(Object.keys(user)); // ['name', 'age', 'isValid', 'email']
```

Object.values()는 객체의 속성값을 나열한 배열을 반환

## JSON(JavaScript Object Notation)

- 데이터 전달을 위한 표준 포맷
- 문자, 숫자, boolean, Null, 객체, 배열만 사용
- 문자는 큰 따옴표로 사용
- 후행 쉼표 사용 불가
- .json 확장자 사용
- JSON.stringify() : 데이터를 JSON 문자로 변환
- JSON.parse() : JSON 문자를 분석해 데이터로 변환

강의 내용에서 test.json파일을 두고 main.js에 `import abc from './test.json'`으로 값을 가져오는데 parcel 번들럭가 알아서 해주기에 가능하다.

## 모듈(Module)

: 특정 데이터들의 집합(파일)

모듈 가져오기(import), 내보내기(export)

### 기본 내보내기

`export default` 1개의 파일에서 1개만 가능하며, 변수의 이름 없이 내보내면 받는 부분에서 임의의 이름을 통해 받을 수 있다.

```js
// module.js
export default 123;
```

```js
// main.js
import number from "./module.js";
```

### 이름 내보내기

`export const 변수명` 여러 개 내보낼 수 있음.

```js
// module.js
export const num = 123;
export const age = 33;
export const name = "June";
export const func() {}
```

```js
// main.js
import { num, age, name, func as hello } from "./module.js";

hello(); // 가져온 이름 as를 통해 변경 후 사용
```

```js
import * as abc from "./module.js";

console.log(abc);
```

`*` 와일드카드로 전체를 다 받아오는 방식

### 동적으로 모듈 가져오기, 가져온 모듈 바로 내보내기

`import * as abc from "./module.js";` 최상위에 작성해야하는데 동적으로 받기 위해 다음과 같은 대안이 있다.

예를 들어 setTimeout 함수에서 1초 후에 모듈들을 받아야 한다고 하면,

```js
setTimeout(() => {
  import("./module.js").then((abc) => {
    console.log(abc);
  });
}, 1000);

// async / await 방식
setTimeout(async () => {
  const abc = await import("./module.js");
  console.log(abc);
}, 1000);
```

#### 가져온 모듈 바로 내보내기

```js
// a.js
export const a = 123;
```

```js
// b.js
export const b = 456;
```

```js
// utils.js
export { a } from "./a.js";
export { b } from "./b.js";
```

```js
// main.js
export { a, b } from "./utils.js";
```
