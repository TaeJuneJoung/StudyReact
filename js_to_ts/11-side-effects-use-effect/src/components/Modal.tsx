import {type FC, type PropsWithChildren, useRef, useEffect} from 'react'
import {createPortal} from 'react-dom'

type ModalProps = {
  open: boolean
  onClose: () => void
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({open, onClose, children}) => {
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (open) {
      dialog.current?.showModal()
    } else {
      dialog.current?.close()
    }
  }, [open])

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {open ? children : null}
    </dialog>,
    document.getElementById('modal')!
  )
}

export default Modal
