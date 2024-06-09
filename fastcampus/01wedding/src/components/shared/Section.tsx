import classNames from 'classnames/bind'
import styles from './Section.module.scss'

const cx = classNames.bind(styles)

function Section({
  children,
  className,
  title,
}: {
  children: React.ReactNode
  className?: string
  title?: string
}) {
  return (
    <>
      <div>{title}</div>
      <section className={cx(['container', className])}>{children}</section>
    </>
  )
}

export default Section
