# 04Section

## JSX를 꼭 사용하지 않아도 되는 이유

```html
<div id="content">
  <p>Hello World!</p>
</div>
```

```js
React.createElement(
  'div',
  { id: 'content' },
  React.createElement(
    'p',
    null,
    'Hello World'
  )
);
```

JSX를 이용하지 않아도 되지만 JSX를 이용하면 가시적으로나 코드양적으로도 편하다.


## Fragments 사용법

JSX표현식은 하나의 상위 혹은 부모 요소를 가지고 있어야 한다.

```jsx
return (
  <div>
    <Header />
    <main>
      <section id="core-concepts">
        <h2>Core Concepts</h2>
        <ul>
          {CORE_CONCEPTS.map((conceptItem) => (
            <CoreConcept key={conceptItem.title} {...conceptItem} />
          ))}
        </ul>
      </section>
      <section id="examples">
        <h2>Examples</h2>
        <menu>
          <TabButton
            isSelected={selectedTopic === 'components'}
            onSelect={() => handleSelect('components')}
          >
            Components
          </TabButton>
          <TabButton
            isSelected={selectedTopic === 'jsx'}
            onSelect={() => handleSelect('jsx')}
          >
            JSX
          </TabButton>
          <TabButton
            isSelected={selectedTopic === 'props'}
            onSelect={() => handleSelect('props')}
          >
            Props
          </TabButton>
          <TabButton
            isSelected={selectedTopic === 'state'}
            onSelect={() => handleSelect('state')}
          >
            State
          </TabButton>
        </menu>
        {tabContent}
      </section>
    </main>
  </div>
);
```
해당 부분에 return에 맞게 하기 위해서 `<div>`태그로 감싸주었는데 스타일적으로나 요소적으로 불필요할 때 Fragment를 사용할 수 있다. `<>`방식으로 비워서도 쓸수 있는데 차이가 무엇일까?

🧑🏻‍🏫 `<>`는 Fragment 축약형 표현으로 React 버전이 올라가면서 사용할 수 있는 기능이 되었다. Fragment는 import를 받아서 사용해야하는 반면에 `<>`는 import 없이 바로 사용할 수도 있다.

## Feature 및 State로 컴포넌트 분리하기

- CoreConcepts.jsx

- Examples.jsx

두 개를 두어서 App.jsx를 간소화하는 동시에 분리

분리하는 이유는 기존 App.jsx useState가 있어서 상태관리가 이뤄질 때 Tab버튼을 눌렀는데 Header의 값이 동시에 바뀌게 되었다. State가 변해진 곳과 그 자식, 손자까지 변화가 생기기에 발생한 것이니 이를 세분화하여 컴포넌트를 나눠 영향을 미치지 않게 처리

## 감싸진 요소에 props 전달하기

```jsx
export default function Section({ title, id, className, children }) {
  return (
    <section id={id} className={className}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
```
이러한 방식으로 여러개 값을 작성해야할 때 크기가 작을 때는 부담이 덜하지만 크기가 커지면 커질수록 작성해야하는 요소가 많기에 부담이 된다. 이를 편리하게 돕는 방법으로 다음과 같이 할 수 있다.

```jsx
export default function Section({ title, children, ...styles }) {
  return (
    <section {...styles}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
```

## 여러 JSX 슬롯 활용법⭐

🤔해당 부분 이해가 잘 안됨. 왜 이게 필요한 것인지 모르겠음

```jsx
// Tabs.jsx
export default function Tabs({ children, buttons }) {
  return (
    <>
      <menu>{buttons}</menu>
      {children}
    </>
  )
}
```

해당 부분을 만든 다음에 Examples.jsx를 변경함.

```jsx
// Examples.jsx
return (
  <Section title="Examples" id="examples">
    <Tabs
      buttons={
        <>
          <TabButton
            isSelected={selectedTopic === 'components'}
            onClick={() => handleSelect('components')}
          >
            Components
          </TabButton>
          <TabButton
            isSelected={selectedTopic === 'jsx'}
            onClick={() => handleSelect('jsx')}
          >
            JSX
          </TabButton>
          <TabButton
            isSelected={selectedTopic === 'props'}
            onClick={() => handleSelect('props')}
          >
            Props
          </TabButton>
          <TabButton
            isSelected={selectedTopic === 'state'}
            onClick={() => handleSelect('state')}
          >
            State
          </TabButton>
        </>
      }
    >
      {tabContent}
    </Tabs>
  </Section>
)
```

