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