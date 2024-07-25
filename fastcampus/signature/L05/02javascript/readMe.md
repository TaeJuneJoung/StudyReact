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
