# Context

props를 통해서 값을 전달하다보면 한참 아래의 자손에게 보내야하는 일이 생길 때 중간에서는 사용하지 않지만 계속 보내줘야한다. 이러한 현상을 `props drilling`이라고 표현한다. 컴포넌트의 재사용에 어려움이 생기기에 좋지 않은 방도이다.

이를 쉽게 해결하기 위한 방안으로 Context API가 있다.

부모 컴포넌트 -> `createContext` -> `<Provider value={} />`

사용처 자식 컴포넌트 -> `useContext` 공유 정보 취득

```tsx
// store/shopping.tsx [미완성]
import {type FC, type PropsWithChildren, createContext} from 'react'

type itemType = {
  id: string
  name: string
  price: number
  quantity: number
}

type ContextType = {
  items: itemType[]
  addItemToCart: () => void
  updateCartItemQuantity: () => void
}

const defaultContextValue: ContextType = {
  items: [],
  addItemToCart: () => {},
  updateCartItemQuantity: () => {}
}

export const CartContext = createContext<ContextType>(defaultContextValue)

const CartContextProvider: FC<PropsWithChildren> = ({children}) => {
  const cartValue: ContextType = {
    items: [],
    addItemToCart: () => {},
    updateCartItemQuantity: () => {}
  }
  return <CartContext.Provider value={cartValue} children={children} />
}

export default CartContextProvider
```

## useReducer

상태 관리의 목적을 가지고 하나 또는 그 이상의 값을 보다 단순하게 하나의 값으로 줄이는 훅

```tsx
const [상태값, reducer함수 연결함수] = useReducer(reducer함수, 초기값)
```
