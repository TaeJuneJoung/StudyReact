# TODO

## section 03

**🤔왜 화살표 함수를 사용할 때 `{}`가 아닌 `()`으로 사용하였을까?**

```jsx
{
  CORE_CONCEPTS.map((conceptItem) => (
    <CoreConcept key={conceptItem.title} {...conceptItem} />
  ));
}
```

물론 괄호를 사용하지 않고도 동작은 한다.

> Section 04까지 하면서 느낀 것은 엔터하고 사용해도 구분해주는 용도라고 보면 됨.
> 자세한 내용이 있으면 이후 추가 예정

## section 04: TIC-TAC-TOE

해당 프로젝트는 추후 다시 만들어볼 것

## section 08: refs / portals

**🤔TODO: forwardRef에 대해서 살펴보자.**

**🤔TODO: userImperativeHandle에 대해서 살펴보자.**

**🤔TODO: Modal 바깥 부분을 눌렀을 때는 어떻게 할 것인가?**

## section 10: Context / reducer

- 해당 프로젝트 이후에 다시 작성해보기

## section 11: useEffect, useCallback

- section12 연습문제 풀면서 재확인 해볼 것

## section 13: class-based component

- [this](https://academind.com/tutorials/this-keyword-function-references)

## section 20: 316강 내용부터 다시 파악 필요

## section 21

**🤔TODO: Outlet이란 무엇인가?**
**🤔TODO: end 왜 써?**
**✅🤔TODO: 동적 라우트**

1. 없는 id값을 작성했을 때 처리는 어떻게 할 것인가?
2. 데이터들은 어떻게 가져올 것인가? id값을 기반으로 fetch를 해서 적용시키나? (가장 일반적 방법일듯한데..)

> 해당 방안에 대해서 advanced에서 다루었다.
>
> 1. loader를 통해서 REST API를 통해서 데이터를 가져오고 id값의 경우에는 params를 이용하여 URL주소에 id값을 가져온다.
> 2. id값으로 fetch해서 가져오는 것은 맞음 -> loader함수를 사용

**🤔TODO: `Suspense`와 `Await`에 대해서 설명 할 수 있어야 좋을듯**

## section 22: Authentication

**🤔TODO: 사용자 인증 만료 부분에 대해서 setTimeout을 쓴건 이해하겠으나 연장할 때의 방안 고려해야할 듯**

**🤔TODO: JWT TOKEN 방식에 대해서 살펴볼 것**

## section 23: Deploy

**🤔TODO: 지연(lazy) 로딩을 왜 사용하는가?**

**🤔TODO: AWS나 다른 클라우드 컴퓨팅을 이용한 배포 방안**
