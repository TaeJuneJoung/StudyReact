# Behind The Scenes

```ts
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  setEnteredNumber(notused => +e.target.value)
}
```

value를 쓰기 위해서는 `ChageEvent<HTMLInputElement>` HTMOInputElement를 넣어주어야 한다.
