import {useCallback, useMemo, useState} from 'react'

import * as D from '../data'
import {Div, Icon, Title} from '../components'

export default function ArrayState() {
  const [images, setImages] = useState<string[]>([])
  const addImage = useCallback(() => {
    setImages(imageList => [D.randomImage(200, 100, 50), ...imageList])
  }, [])

  const clearImages = useCallback(() => {
    setImages(notUsed => [])
  }, [])

  const children = useMemo(
    () =>
      images.map((image, index) => (
        <Div
          key={index}
          src={image}
          className="w-1/5 m-2"
          height="5rem"
          minHeight="5rem"
        />
      )),
    [images]
  )

  return (
    <section className="mt-4">
      <Title>ArrayState</Title>
      <div className="flex justify-center mt-4">
        <div data-tip="add image" className="tooltip">
          <Icon name="add" onClick={addImage} className="mr-12 text-3xl btn-primary" />
        </div>
        <div data-tip="clear all" className="tooltip">
          <Icon name="clear_all" onClick={clearImages} className="text-3xl" />
        </div>
      </div>
      <div className="flex flex-wrap justify-center mt-4">{children}</div>
    </section>
  )
}
