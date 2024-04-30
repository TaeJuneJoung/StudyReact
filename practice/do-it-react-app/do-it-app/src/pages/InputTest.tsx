import {ChangeEvent, useCallback, useState} from 'react'
import {Title} from '../components'

export default function InputTest() {
  const [value, setValue] = useState<string>('')
  const [checked, setChecked] = useState<boolean>(false)

  const onChangeValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setValue(preValue => e.target.value)
  }, [])

  const onChangeChecked = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setChecked(preChecked => e.target.checked)
  }, [])

  return (
    <section className="mt-4">
      <Title>InputTest</Title>
      <div className="flex items-center justify-center p-4 mt-4">
        <label htmlFor="text-input">Text</label>
        <input
          id="text-input"
          className="border"
          type="text"
          onChange={onChangeValue}
          defaultValue={value}
        />
        <label htmlFor="check-input" className="ml-3">
          CHECK
        </label>
        <input
          id="check-input"
          type="checkbox"
          onChange={onChangeChecked}
          defaultChecked={checked}
        />
      </div>
    </section>
  )
}
