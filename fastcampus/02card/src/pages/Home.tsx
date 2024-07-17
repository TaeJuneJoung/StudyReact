import { useEffect } from 'react'

import Top from '@shared/Top'

import { getCards } from '@remote/card'
import { getAdBanners } from '@/remote/adBanner'

function HomePage() {
  useEffect(() => {
    getCards().then((response) => {
      console.log(response)
    })

    getAdBanners().then((response) => {
      console.log(response)
    })
  }, [])

  return (
    <div>
      <Top
        title="혜택 좋은 카드"
        subTitle="회원님을 위해서 혜택 좋은 카드를 모아봤어요"
      />
    </div>
  )
}

export default HomePage
