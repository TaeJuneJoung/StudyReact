import type {FC} from 'react'

export type ArrowComponentProps = {
  href: string
  text: string
}

const ArrowComponent: FC<ArrowComponentProps> = ({href, text}) => {
  return (
    <li>
      <a href={href}>
        <p>{text}</p>
      </a>
    </li>
  )
}

export default ArrowComponent
