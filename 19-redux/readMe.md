# Redux

리덕스는 크로스 컴포넌트 또는 앱 와이드 상태를 위한 상태 관리 시스템이다.

- Local State
- Cross-Component State: 다수의 컴포넌트에 영향을 주는 상태. ex) Modal
- App-Wide State: 대다수/모든 컴포넌트에 영향을 주는 상태.

> **Local State**
>
> : State that belongs to a single component.
>
> E.g. listening to user input in a input field; toggling a "show more" details field
>
> Should be managed component-internal with useState()/useReducer()
>
> **Cross-Component State**
>
> : State that affects multiple components.
>
> E.g. open/closed state of a modal overlay
>
> Requires "prop chains"/"prop drilling" or React Context / Redux
>
> **App-Wide State**
>
> : State that affects the entire app (most/all components)
>
> E.g. user authentication status
>
> Requires "prop chains"/"prop drilling" or React Context / Redux

## 리덕스 대 리액트 컨텍스트

React Context가 있는데 Redux는 왜 필요한가?
React Context는 잠재적인 단점이 존재한다. 이 단점이 발현되지 않을 곳에서는 Context를 사용해도 된다.
단점은 설정이 아주 복잡해질 수 있고 컨스트를 이용한 상태 관리가 상당히 복잡해질 수 있다는 점이다.
엔터프라이즈 형태의 대형 애플리케이션 구축시에는 복잡한 형태가 나오게 된다.
```jsx
// 예시
return (
  <AuthContextProvider>
    <ThemeContextProvider>
      <UIInteractionContextProvider>
        <MultiStepFromContextProvider>
          <UserRegistration />
        </MultiStepFromContextProvider>
      </UIInteractionContextProvider>
    </ThemeContextProvider>
  </AuthContextProvider>
)
```
잠재적인 단점은 성능이다.
고빈도 상태 변경에는 리액트 컨텍스트를 사용하지 말아야 한다.