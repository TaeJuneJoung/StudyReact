import {SyntheticEvent} from 'react'
import {Icon} from '../components/IconComponent'

import classes from './StopPropagation.module.css'

export default function StopPropagation() {
  const onDivClick = (e: SyntheticEvent) => console.log('click event div')
  const onButtonClick = (e: SyntheticEvent) => {
    console.log('click event button')
    e.stopPropagation()
  }

  return (
    <>
      <Icon name="home" className={`${classes.textRed} ${classes.fontSize24}`} />
      <Icon
        name="check_circle_outline"
        className={`${classes.textBlue} ${classes.fontSize16}`}
      />
      <div onClick={onDivClick}>
        <button onClick={onButtonClick}>click</button>
      </div>
    </>
  )
}
