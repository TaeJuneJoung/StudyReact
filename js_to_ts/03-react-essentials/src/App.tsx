import Header from './components/Header/Header'
import {CoreConcept} from './components'
import TabButton from './components/TabButton'

import {CORE_CONCEPTS, EXAMPLES} from './data'
import {useCallback, useState} from 'react'

const TOPICS = {
  COMPONENTS: 'components',
  JSX: 'jsx',
  PROPS: 'props',
  STATE: 'state'
}

function App() {
  const [selectTopic, setSelectTopic] = useState<string>('')

  const onClick = useCallback(
    (clickTopic: string) => () => {
      setSelectTopic(notUsed => clickTopic)
    },
    []
  )

  return (
    <>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            {CORE_CONCEPTS.map(conceptItem => (
              <CoreConcept key={conceptItem.title} {...conceptItem} />
            ))}
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton
              isSelected={selectTopic === TOPICS.COMPONENTS}
              onSelect={onClick(TOPICS.COMPONENTS)}>
              Components
            </TabButton>
            <TabButton
              isSelected={selectTopic === TOPICS.JSX}
              onSelect={onClick(TOPICS.JSX)}>
              JSX
            </TabButton>
            <TabButton
              isSelected={selectTopic === TOPICS.PROPS}
              onSelect={onClick(TOPICS.PROPS)}>
              Props
            </TabButton>
            <TabButton
              isSelected={selectTopic === TOPICS.STATE}
              onSelect={onClick(TOPICS.STATE)}>
              State
            </TabButton>
          </menu>
          {!selectTopic ? (
            <p>TOPIC을 선택해주세요.</p>
          ) : (
            <div id="tab-content">
              <h3>{EXAMPLES[selectTopic].title}</h3>
              <p>{EXAMPLES[selectTopic].description}</p>
              <pre>
                <code>{EXAMPLES[selectTopic].code}</code>
              </pre>
            </div>
          )}
        </section>
      </main>
    </>
  )
}

export default App
