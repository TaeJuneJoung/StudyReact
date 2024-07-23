import type {FC, ReactNode} from 'react'

type SectionWrapProps = {
  id: string
  title: string
  children?: ReactNode | undefined
}

const SectionWrap: FC<SectionWrapProps> = ({id, title, children}) => {
  return (
    <section id={id}>
      <h2>{title}</h2>
      {children}
    </section>
  )
}

export default SectionWrap
