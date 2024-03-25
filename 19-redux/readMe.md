# Redux

리덕스는 크로스 컴포넌트 또는 앱 와이드 상태를 위한 상태 관리 시스템이다.

- Local State
- Cross-Component State: 다수의 컴포넌트에 영향을 주는 상태. ex) Modal
- App-Wide State: 대다수/모든 컴포넌트에 영향을 주는 상태.

> **Local State**
>
> : State that belongs to a single component.
>
> E.g. listening to user input in a input field; toggling a "show more" details field
>
> Should be managed component-internal with useState()/useReducer()
>
> **Cross-Component State**
>
> : State that affects multiple components.
>
> E.g. open/closed state of a modal overlay
>
> Requires "prop chains"/"prop drilling" or React Context / Redux
>
> **App-Wide State**
>
> : State that affects the entire app (most/all components)
>
> E.g. user authentication status
>
> Requires "prop chains"/"prop drilling" or React Context / Redux

## 리덕스 대 리액트 컨텍스트

React Context가 있는데 Redux는 왜 필요한가?
React Context는 잠재적인 단점이 존재한다. 이 단점이 발현되지 않을 곳에서는 Context를 사용해도 된다.
단점은 설정이 아주 복잡해질 수 있고 컨스트를 이용한 상태 관리가 상당히 복잡해질 수 있다는 점이다.
엔터프라이즈 형태의 대형 애플리케이션 구축시에는 복잡한 형태가 나오게 된다.

```jsx
// 예시
return (
  <AuthContextProvider>
    <ThemeContextProvider>
      <UIInteractionContextProvider>
        <MultiStepFromContextProvider>
          <UserRegistration />
        </MultiStepFromContextProvider>
      </UIInteractionContextProvider>
    </ThemeContextProvider>
  </AuthContextProvider>
);
```

잠재적인 단점은 성능이다.
고빈도 상태 변경에는 리액트 컨텍스트를 사용하지 말아야 한다.

## 리덕스 createStore()는 사용(불)가능합니다.

IDE에서 사용중단 경고가 나올 수 있으나 해당 경고는 무시해야 한다.
문제없이 사용가능하다.
리덕스 팀은 리덕스 툴킷이라는 추가 패키지와 리덕스 스토어를 생성하는 다른 방법 사용을 권장한다.
추후 다룰 것이기에 이전 사용법(createStore)에 대해서 먼저 익혀보자.

![Core Redux Concepts](./_asset/redux.png)

```bash
npm install redux react-redux
```

**Reducer Function**

순수 함수여야 한다.

- inputs: Old State + Dispatched Action
- output: New State Object

## 리액트 컴포넌트에서 리덕스 데이터 사용하기

useStore을 사용해도 되지만 선택해서 사용하기 위해 useSelector 이용

```js
import { useSelector, useDispatch, connect } from "react-redux";
```

connect 함수는 클래스 컴포넌트를 감싸는 래퍼로 사용해서 해당 클래스 컴포넌트를 저장소에 연결할 수 있다.
함수 컴포넌트에서는 useSelector와 useDispatch를 이용하는 것이 더 편리하다.

**함수형 컴포넌트**

```jsx
import { useSelector, useDispatch } from "react-redux";

import classes from "./Counter.module.css";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);

  const incrementHandler = () => {
    dispatch({ type: "increment" });
  };

  const decrementHandler = () => {
    dispatch({ type: "decrement" });
  };

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={decrementHandler}>Decrement</button>
        <button onClick={incrementHandler}>Increment</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
```

**클래스형 컴포넌트**

```jsx
import { Component } from "react";
import { connect } from "react-redux";

import classes from "./Counter.module.css";

class Counter extends Component {
  incrementHandler() {
    this.props.increment();
  }
  decrementHandler() {
    this.props.decrement();
  }
  toggleCounterHandler() {}

  render() {
    return (
      <main className={classes.counter}>
        <h1>Redux Counter</h1>
        <div className={classes.value}>{this.props.counter}</div>
        <div>
          <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
          <button onClick={this.incrementHandler.bind(this)}>Increment</button>
        </div>
        <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch({ type: "increment" }),
    decrement: () => dispatch({ type: "decrement" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

클래스 컴포넌트는 Hook을 사용할 수 없기에 다음과 같이 작성한다.
