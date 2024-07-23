# Behind The Scenes

```ts
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  setEnteredNumber(notused => +e.target.value)
}
```

value를 쓰기 위해서는 `ChageEvent<HTMLInputElement>` HTMOInputElement를 넣어주어야 한다.

## memo

속성값들이 동일하다면 컴포넌트 실행을 memo가 저지 -> 효율적 성능 관리

but, 속성값 비교를 해야하기에 모든 부분에 다 사용하면 좋지 않다.
