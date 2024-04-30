import {useCallback, useRef} from 'react'
import {Title} from '../components'
import {Button} from '../theme/daisyui'

export default function ClickTest() {
  const inputRef = useRef<HTMLInputElement>(null)

  const onClick = useCallback(() => {
    inputRef.current?.click()
  }, [])

  return (
    <section className="mt-4">
      <Title>ClickTest</Title>
      <div className="mt-4 flex justify-center items-center">
        <Button className="btn-primary mr-4" onClick={onClick}>
          CLICK ME
        </Button>
        <input type="file" ref={inputRef} accept="image/*" className="hidden" />
      </div>
    </section>
  )
}
