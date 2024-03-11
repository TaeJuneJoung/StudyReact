# Props

```jsx
function CoreConcept(props) {
  return (
    <li>
      <img src={props.image} alt={props.title} />
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </li>
  )
}

function App() {
  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            <CoreConcept
              title="Componenets"
              description="The componenets building block."
              image={componentsImg}
            />
            <CoreConcept
              title="JSX"
              description="The jsx building block."
              image={jsxImg}
            />
            <CoreConcept
              title="Props"
              description="The props building block."
              image={propsImg}
            />
            <CoreConcept
              title="State"
              description="The state building block."
              image={stateImg}
            />
          </ul>
        </section>
      </main>
    </div>
  );
}
```

`prop` 파라미터를 사용한 방식에서 간추리기 위해서 객체 구조적 분해 방식 사용과 data.js를 이용한 방식을 통해 스프레드 연산자 사용 (API로 넘어온 데이터라고 한다면 이와 같은 방식이 유용할듯)

```js
// data.js
import componentsImg from './assets/components.png';
import propsImg from './assets/config.png';
import jsxImg from './assets/jsx-ui.png';
import stateImg from './assets/state-mgmt.png';

export const CORE_CONCEPTS = [
  {
    image: componentsImg,
    title: 'Components',
    description:
      'The core UI building block - compose the user interface by combining multiple components.',
  },
  {
    image: jsxImg,
    title: 'JSX',
    description:
      'Return (potentially dynamic) HTML(ish) code to define the actual markup that will be rendered.',
  },
  {
    image: propsImg,
    title: 'Props',
    description:
      'Make components configurable (and therefore reusable) by passing input data to them.',
  },
  {
    image: stateImg,
    title: 'State',
    description:
      'React-managed data which, when changed, causes the component to re-render & the UI to update.',
  },
];
```

```jsx
// App.jsx
import { CORE_CONCEPTS } from './data';

function CoreConcept({ title, description, image }) {
  return (
    <li>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </li>
  )
}

function App() {
  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            <CoreConcept {...CORE_CONCEPTS[0]} /> {/* 스프레드 연산자 */}
            <CoreConcept {...CORE_CONCEPTS[1]} />
            <CoreConcept {...CORE_CONCEPTS[2]} />
            <CoreConcept {...CORE_CONCEPTS[3]} />
          </ul>
        </section>
      </main>
    </div>
  );
}
```

**파일 모듈(분리)화**

Header와 CoreConcept을 따로 빼서 components 폴더에 두었다.

import와 export도 해당 부분에 맞게 설정 필요

이후, index.css에서 있던 Header에 쓰는 것을 따로 Header.css를 만들어서 처리

⚠️해당 부분에서만 사용되지 않고 전체적으로 사용은 되었다.

```jsx
import { CORE_CONCEPTS } from './data.js';
import Header from './components/Header/Header.jsx';
import { CoreConcept } from './components/CoreConcept.jsx';

function App() {
  return (
    <div>
      <header>
        <h1>Hello World</h1>
      </header>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            <CoreConcept {...CORE_CONCEPTS[0]} />
            <CoreConcept {...CORE_CONCEPTS[1]} />
            <CoreConcept {...CORE_CONCEPTS[2]} />
            <CoreConcept {...CORE_CONCEPTS[3]} />
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
```

Header.jsx부분에만 사용되는 것이 아닌 App.jsx에 header > h1 태그를 만들어서 진행하면 이 태그에도 그대로 Header.css 내용이 적용되었다.


### props.children

```jsx
<TabButton>Components</TabButton>
```

해당 코드와 같이 속성으로 넣은 것이 아니라 컴포넌트 안에 글자를 쓴 것을 받는 방법으로 `props.children` 방식을 사용할 수 있다.


```jsx
export default function TabButton(props) {
	return <li><button>{props.children}</button></li>;
}
```

다음과 같이 적용할 수 있다.

### event

```jsx
// TabButton.jsx

export default function TabButton({ children }) {
  function onSelect() {
    console.log(`${children}`)
  }

	return (
		<li>
			<button onClick={onSelect}>{children}</button>
		</li>
	);
}
```

보통의 클릭 이벤트는 다음과 같이 처리하나 파라미터를 받아서 처리해야할 경우는 다음과 같이 할 수 있다.

```jsx
// App.jsx

function App() {
  function handleSelect(selectButton) {
    console.log(selectButton)
  }

  return (    
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            <CoreConcept {...CORE_CONCEPTS[0]} />
            <CoreConcept {...CORE_CONCEPTS[1]} />
            <CoreConcept {...CORE_CONCEPTS[2]} />
            <CoreConcept {...CORE_CONCEPTS[3]} />
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton onSelect={() => handleSelect('components')}>Components</TabButton>
            <TabButton onSelect={() => handleSelect('jsx')}>JSX</TabButton>
            <TabButton onSelect={() => handleSelect('props')}>Props</TabButton>
            <TabButton onSelect={() => handleSelect('state')}>State</TabButton>
          </menu>

        </section>
      </main>
    </div>
  );
}
```

```jsx
// TabButton.jsx
export default function TabButton({ children, onSelect }) {
	return (
		<li>
			<button onClick={onSelect}>{children}</button>
		</li>
	);
}
```

### 조건적 콘텐츠 렌더링

1. 삼항 연산자
```jsx
{!selectTopic ? <p>Please select a topic.</p> : (
  <div id="tab-content">
  <h3>{EXAMPLES[selectTopic].title}</h3>
  <p>{EXAMPLES[selectTopic].description}</p>
  <pre>
    <code>
      {EXAMPLES[selectTopic].code}
    </code>
  </pre>
</div>
)}
```

2. && 연산자
```jsx
{!selectTopic && <p>Please select a topic.</p>}
{selectTopic &&
  (<div id="tab-content">
    <h3>{EXAMPLES[selectTopic].title}</h3>
    <p>{EXAMPLES[selectTopic].description}</p>
    <pre>
      <code>
        {EXAMPLES[selectTopic].code}
      </code>
    </pre>
  </div>
)}
```

3. 변수 처리
```jsx
let topicContent = <p>Please select a topic.</p>;

if (selectTopic) {
  <div id="tab-content">
    <h3>{EXAMPLES[selectTopic].title}</h3>
    <p>{EXAMPLES[selectTopic].description}</p>
    <pre>
      <code>
        {EXAMPLES[selectTopic].code}
      </code>
    </pre>
  </div>
}

{topicContent}
```

### List 데이터 동적 출력

```jsx
<CoreConcept {...CORE_CONCEPTS[0]} />
<CoreConcept {...CORE_CONCEPTS[1]} />
<CoreConcept {...CORE_CONCEPTS[2]} />
<CoreConcept {...CORE_CONCEPTS[3]} />
```

기존에 했던 방식을 map함수를 이용하여 동적으로 처리하였다. 동적으로 처리하지 않으면 개수의 변동이 생기면 문제가 되기 때문이다.

```jsx
{CORE_CONCEPTS.map(conceptItem => (
  <CoreConcept key={conceptItem.title} {...conceptItem} />
))}
```

왜 화살표 함수를 사용할 때 `{}`가 아닌 `()`으로 사용하였을까?

물론 괄호를 사용하지 않고도 동작은 한다.