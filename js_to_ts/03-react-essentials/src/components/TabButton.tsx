import {FC, MouseEventHandler, ReactNode} from 'react'

type TabButtonProps = {
  children?: ReactNode | undefined
  onSelect: MouseEventHandler<HTMLButtonElement>
  isSelected: boolean
}

const TabButton: FC<TabButtonProps> = ({children, onSelect, isSelected}) => {
  return (
    <li>
      <button className={isSelected ? 'active' : undefined} onClick={onSelect}>
        {children}
      </button>
    </li>
  )
}

export default TabButton
