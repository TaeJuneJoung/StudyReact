import {ReactNode, forwardRef, useImperativeHandle, useRef} from 'react'
import {createPortal} from 'react-dom'
import Cart from './Cart'

type CartModalProps = {
  title: string
  actions: ReactNode
}

export type DialogActions = {
  open: () => void
}

const CartModal = forwardRef<DialogActions, CartModalProps>(({title, actions}, ref) => {
  const dialog = useRef<HTMLDialogElement | null>(null)

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current?.showModal()
      }
    }
  })

  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      <Cart />
      <form method="dialog" id="modal-actions">
        {actions}
      </form>
    </dialog>,
    document.getElementById('modal')!
  )
})

export default CartModal
