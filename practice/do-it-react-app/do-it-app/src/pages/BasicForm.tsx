import {ChangeEvent, FormEvent, useCallback, useState} from 'react'
import {Title} from '../components'
import {Input} from '../theme/daisyui/Input'

export default function BasicForm() {
  const [name, setName] = useState<string>('')
  const [email, setAge] = useState<string>('')

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const formData = new FormData()
      formData.append('name', name)
      formData.append('email', email)
      console.log(Object.fromEntries(formData))
    },
    [name, email]
  )

  const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(notUsed => e.target.value)
  }, [])

  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setAge(notUsed => e.target.value)
  }, [])

  return (
    <section className="mt-4">
      <Title>BasicForm</Title>
      <div className="flex justify-center mt-4">
        <form onSubmit={onSubmit}>
          <div className="form-control">
            <label htmlFor="name" className="label">
              <span className="label-text">User Name</span>
            </label>
            <Input
              value={name}
              onChange={onChangeName}
              id="name"
              type="text"
              placeholder="enter your name"
              className="input-primary"
            />
          </div>
          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text">User Age</span>
            </label>
            <Input
              value={email}
              onChange={onChangeEmail}
              id="email"
              type="text"
              placeholder="enter your email"
              className="input-primary"
            />
          </div>
          <div className="flex justify-center mt-4">
            <input
              type="submit"
              value="SUBMIT"
              className="w-1/2 btn btn-sm btn-primary"
            />
            <input
              type="button"
              defaultValue="CANCEL"
              className="w-1/2 ml-4 btn btn-sm"
            />
          </div>
        </form>
      </div>
    </section>
  )
}
