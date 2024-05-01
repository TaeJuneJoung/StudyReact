import {type FC, forwardRef, useImperativeHandle, useRef} from 'react'
import {createPortal} from 'react-dom'

export type ResultModalProps = {
  targetTime: number
  remainTime: number
  onReset: () => void
}

const ResultModal: FC<ResultModalProps> = forwardRef(
  ({targetTime, remainTime, onReset}, ref) => {
    const dialog = useRef<HTMLDialogElement | null>(null)
    const isUserLost = remainTime <= 0
    const formattedRemainTime = (remainTime / 1000).toFixed(2)
    const score = Math.round((1 - remainTime / (targetTime * 1000)) * 100)

    useImperativeHandle(ref, () => {
      return {
        open() {
          dialog.current?.showModal()
        }
      }
    })

    return createPortal(
      <dialog ref={dialog} className="result-modal">
        <h2>Your Score: </h2>
        {isUserLost && <h2>You lost</h2>}
        {!isUserLost && <h2>Your Score: {score}</h2>}
        <p>
          The target time was <strong>{targetTime} seconds.</strong>
        </p>
        <p>
          You stopped the timer with <strong>{formattedRemainTime} seconds left.</strong>
        </p>
        <form method="dialog" onSubmit={onReset}>
          <button>Close</button>
        </form>
      </dialog>,
      document.getElementById('modal')!
    )
  }
)

export default ResultModal
