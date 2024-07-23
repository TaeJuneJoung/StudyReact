import {type FC, type PropsWithChildren, createContext, useReducer} from 'react'
import {DUMMY_PRODUCTS} from '../data'

type ItemType = {
  id: string
  name: string
  price: number
  quantity: number
}

type ContextType = {
  items: ItemType[]
  addItemToCart: (id: string) => void
  updateCartItemQuantity: (id: string, amount: number) => void
}

const defaultContextValue: ContextType = {
  items: [],
  addItemToCart: () => {},
  updateCartItemQuantity: () => {}
}

export const CartContext = createContext<ContextType>(defaultContextValue)

const DISPATCH_ACTION = {
  ADD: 'add' as const,
  UPDATE: 'update' as const
}

// prettier-ignore
type ShoppingCartAction =
  | { type: typeof DISPATCH_ACTION.ADD; id: string }
  | { type: typeof DISPATCH_ACTION.UPDATE; id: string; amount: number };
type ShoppingCartType = {
  items: ItemType[]
}

const shoppingCartReducer = (
  state: ShoppingCartType,
  action: ShoppingCartAction
): ShoppingCartType => {
  switch (action.type) {
    case DISPATCH_ACTION.ADD: {
      const updatedItems = [...state.items]
      const existItemIndex = updatedItems.findIndex(item => item.id === action.id)
      const existItem = updatedItems[existItemIndex]

      if (existItem) {
        const updatedItem = {
          ...existItem,
          quantity: existItem.quantity + 1
        }
        updatedItems[existItemIndex] = updatedItem
      } else {
        const product = DUMMY_PRODUCTS.find(product => product.id === action.id)
        updatedItems.push({
          id: action.id,
          name: product!.title,
          price: product!.price,
          quantity: 1
        })
      }
      return {
        ...state,
        items: updatedItems
      }
    }
    case DISPATCH_ACTION.UPDATE: {
      const updatedItems = [...state.items]
      const updatedItemIndex = updatedItems.findIndex(item => item.id === action.id)
      const updatedItem = updatedItems[updatedItemIndex]

      updatedItem.quantity += action.amount

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1)
      } else {
        updatedItems[updatedItemIndex] = updatedItem
      }

      return {
        ...state,
        items: updatedItems
      }
    }
    default:
      return state
  }
}

const CartContextProvider: FC<PropsWithChildren> = ({children}) => {
  const initReducerValue: ShoppingCartType = {items: []}
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    initReducerValue
  )

  const handleAddItemToCart = (id: string) => {
    shoppingCartDispatch({
      type: DISPATCH_ACTION.ADD,
      id
    })
  }

  const handleUpdateCartItemQuantity = (id: string, amount: number) => {
    shoppingCartDispatch({
      type: DISPATCH_ACTION.UPDATE,
      id,
      amount
    })
  }

  const cartValue: ContextType = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateCartItemQuantity: handleUpdateCartItemQuantity
  }
  return <CartContext.Provider value={cartValue} children={children} />
}

export default CartContextProvider
