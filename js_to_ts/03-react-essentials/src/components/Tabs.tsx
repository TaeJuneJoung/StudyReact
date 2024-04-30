import type {ElementType, FC, ReactNode} from 'react'

type TabsProps = {
  children?: ReactNode | undefined
  buttons: ReactNode
  ButtonContainer?: ElementType
}

const Tabs: FC<TabsProps> = ({children, buttons, ButtonContainer = 'menu'}) => {
  return (
    <>
      <ButtonContainer>{buttons}</ButtonContainer>
      {children}
    </>
  )
}

export default Tabs
