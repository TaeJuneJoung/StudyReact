# Advanced Redux

- input: (old state + action)
- output: (new state)

리듀서 함수는 순수 함수, side-effect로부터 자유롭거나, 동기화 함수여야 한다.

그러면 side-effects나 비동기 태스크는 어디서 실행해야 하는가?

- 방법1. 내부적인 컴포넌트에 useEffect사용하기
- 방법2. action creators 함수를 작성
