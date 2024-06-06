# 패스트캠퍼스: 프론트엔드 최적화 완전 정복

https://github.com/appear

## 배울 내용

### 최적화 기법

- 동영상과 이미지 최적화
- 폰트 최적화
- 애니메이션 최적화
- SEO 최적화
- 번들 사이즈 줄이는 방법
- 초기 로딩속도를 올리는 방법
- 대용량 리스트를 다루는 방법
- SSR과 CSR을 함께 사용하여 성능을 올리는 방법

```js
useEffect(() => {
  fetch("http://localhost:8080/todos")
    .then((res) => res.json())
    .then((todos) => {
      setTodos(todos);
      setTotalTodosCount(todos.length);
    });
});
```

이 방법보다는

```js
useEffect(() => {
  fetch("http://localhost:8080/todos")
    .then((res) => res.json())
    .then((todos) => {
      setTodos(todos);
    });
});

const totalTodosCount1 = todos.length;
const totalTodosCount2 = useMemo(() => todos.length, [todos]);
```

이 방도가 더 성능적으로 낫다고 함 (물론 설계와 때에 따라 다르겠지만...)

상태값이 꼭 필요한 상태값인지 고민하여 사용하는 것이 성능에 좋다.

## 프로젝트

### 나만의 청첩장

#### 최적화 포인트

- 이미지, 동영상, 폰트 등의 정적 리소스 최적화
- 불필요한 렌더링 줄이기
- UX경험 올리기(예상치 못한 에러 상황 대응)

### 카드사 사이트

#### 최적화 포인트

- 번들 사이즈 다이어트
- 효율적으로 폼 다루기
- UX경험 오리기(유저가 지치지 않는 UI/UX 만들기)

### 여행 커머스

#### 최적화 포인트

- 첫 페이지 렌더링 빠르게
- 대용량 리스트를 다루는 방법
- 애니메이션 최적화
- SEO 최적화

### 자산 관리 사이트

#### 최적화 포인트

- 이전 최적화 기법 모두 적용
- SSR 환경에서의 최적화 기법
- 로그를 활용하여 문제점 찾기
- UX 경험 올리기 (촘촘한 에러 핸들링)
