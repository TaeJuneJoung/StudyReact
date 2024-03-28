# Advanced Redux

- input: (old state + action)
- output: (new state)

리듀서 함수는 순수 함수, side-effect로부터 자유롭거나, 동기화 함수여야 한다.

그러면 side-effects나 비동기 태스크는 어디서 실행해야 하는가?

- 방법1. 내부적인 컴포넌트에 useEffect사용하기
- 방법2. action creators 함수를 작성

## Redux와 함께 useEffect 사용하기

```jsx
// App.jsx
import { useEffect } from "react";
import { useSelector } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {
  const showCart = useSelector((state) => state.ui.visiable);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    fetch("https://udemy-2e132-default-rtdb.firebaseio.com/cart.json", {
      method: "PUT",
      body: JSON.stringify(cart),
    });
  }, [cart]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
```

기존 형태를 유지하면서 App.jsx에 useEffect를 사용하여 http요청을 하였다.
한 가지 문제에 직면할 수 있는데 이것은 초기 비어 있는 값을 백엔드로 보내고 거기에 저장된 모든 데이터를 덮어쓰기 때문에 문제가 된다.

## 리덕스로 Http State 및 피드백 처리하기

🤔TODO:
316강: 해당 부분 이해가 잘 되지 않음.

다시 한번 파악해봐야할듯

useEffect를 통한 해결방안

## 액션 생성자 Thunk 사용하기

Thunk: 다른 작업이 완료될 때까지 작업을 지연시키는 단순한 함수

action creators 함수를 통한 해결 방안
