import {SyntheticEvent} from 'react'

export default function StopPropagation() {
  const onDivClick = (e: SyntheticEvent) => console.log('click event div')
  const onButtonClick = (e: SyntheticEvent) => {
    console.log('click event button')
    e.stopPropagation()
  }

  return (
    <div onClick={onDivClick}>
      <button onClick={onButtonClick}>click</button>
    </div>
  )
}
