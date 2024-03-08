# TODO

## section 03

**🤔왜 화살표 함수를 사용할 때 `{}`가 아닌 `()`으로 사용하였을까?**

```jsx
{CORE_CONCEPTS.map(conceptItem => (
  <CoreConcept key={conceptItem.title} {...conceptItem} />
))}
```

물론 괄호를 사용하지 않고도 동작은 한다.