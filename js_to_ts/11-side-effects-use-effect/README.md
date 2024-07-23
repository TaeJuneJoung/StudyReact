# useEffect

useEffect를 사용하지 않을 때는

- Modal START
- Modal END

이후에 클릭마다

useEffect를 사용한 이후에는

이미지를 클릭하여 선택이미지에 넣을 때는 클릭 이벤트가 적용되지 않는다.

성능적으로 useEffect를 사용하는 것이 더 좋음

**useEffect란?**

부수효과를 만들어내는 Hook이다.

의존값에 대하여 변화가 발생하면 부수적으로 실행할 함수를 사용하는 방법이다.

```tsx
import {useEffect, useState, type FC} from 'react'

const TestPage: FC = () => {
  const [stateA, setStateA] = useState(false)
  const [stateB, setStateB] = useState(false)

  const handleStateA = () => {
    setStateA(prev => !prev)
  }
  const handleStateB = () => {
    setStateB(prev => !prev)
  }

  useEffect(() => {
    console.log('A가 변경되었습니다.' + stateA)
  }, [stateA])

  useEffect(() => {
    console.log('B가 변경되었습니다.' + stateB)
  }, [stateB])

  return (
    <>
      <button onClick={handleStateA}>A</button>
      <button onClick={handleStateB}>B</button>
    </>
  )
}

export default TestPage
```

하나의 useEffect에는 `stateA`값이 변화가 생기면 'A가 변경되었다'는 함수를 두었고, 다른 하나의 useEffect에는 `stateB`값이 변경되면 'B가 변경되었다.'가 나오게 했다.

A버튼을 누르게 되면 stateA의존성이 주입된 useEffect가 작동되며, B버튼을 누르면 그에 맞는 효과가 나타나게 된다.

```ts
const storeIdString = localStorage.getItem('selectedPlaces')
const storeIds: string[] = storeIdString ? JSON.parse(storeIdString) : []
const storePlaces: PLACES_TYPE[] = storeIds
  .map((id: string) => AVAILABLE_PLACES.find(place => place.id === id))
  .filter((place): place is PLACES_TYPE => place !== undefined)
```

🤔TODO: `place: PLACES_TYPE`이 아니라 왜 `(place): place is PLACES_TYPE`일까?
