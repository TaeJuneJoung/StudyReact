import { useState } from 'react';

import { CORE_CONCEPTS, EXAMPLES } from './data.js';
import Header from './components/Header/Header.jsx';
import { CoreConcept } from './components/CoreConcept.jsx';
import TabButton from './components/TabButton.jsx';

function App() {
  const [ selectTopic, setSelectTopic ] = useState(null);
  const TOPICS = {
    COMPONENTS: 'components',
    JSX: 'jsx',
    PROPS: 'props',
    STATE: 'state',
  }

  function handleSelect(selectButton) {
    setSelectTopic(selectButton);
  }

  return (    
    <div>
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
              onSelect={() => handleSelect(TOPICS.COMPONENTS)}>
                Components
            </TabButton>
            <TabButton
              isSelected={selectTopic === TOPICS.JSX}
              onSelect={() => handleSelect(TOPICS.JSX)}>
                JSX
            </TabButton>
            <TabButton
              isSelected={selectTopic === TOPICS.PROPS}
              onSelect={() => handleSelect(TOPICS.PROPS)}>
              Props
            </TabButton>
            <TabButton
              isSelected={selectTopic === TOPICS.STATE}
              onSelect={() => handleSelect(TOPICS.STATE)}>
              State
            </TabButton>
          </menu>
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
          
        </section>
      </main>
    </div>
  );
}

export default App;
