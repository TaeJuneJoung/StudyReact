import { parseISO, format, getDay } from 'date-fns'

import classNames from 'classnames/bind'
import styles from './Heading.module.scss'

import Section from '@shared/Section'

const cx = classNames.bind(styles)

const days = [
  '일요일(SUN)',
  '월요일(MON)',
  '화요일(TUE)',
  '수요일(WED)',
  '목요일(THU)',
  '금요일(FRI)',
  '토요일(SAT)',
]

function Heading({ date }: { date: string }) {
  const weddingDate = parseISO(date)

  const title = format(weddingDate, 'yy.MM.dd')
  const subTitle = days[getDay(weddingDate)]

  return (
    <Section className={cx('container')}>
      <div className={cx('txt-date')}>{title}</div>
      <div className={cx('txt-day')}>{subTitle}</div>
    </Section>
  )
}

export default Heading
