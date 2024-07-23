import type {ElementType, FC, PropsWithChildren} from 'react'
import log from '../../log'

type IconButtonType = {
  icon: ElementType
  onClick: () => void
}

const IconButton: FC<PropsWithChildren<IconButtonType>> = ({
  children,
  icon,
  ...props
}) => {
  log('<IconButton /> rendered', 2)

  const Icon = icon

  return (
    <button {...props} className="button">
      <Icon className="button-icon" />
      <span className="button-text">{children}</span>
    </button>
  )
}

export default IconButton
