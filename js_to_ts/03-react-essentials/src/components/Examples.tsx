import {useCallback, useState} from 'react'

import SectionWrap from './SectionWrap'
import Tabs from './Tabs'
import TabButton from './TabButton'
import {EXAMPLES} from '../data'

const TOPICS = {
  COMPONENTS: 'components',
  JSX: 'jsx',
  PROPS: 'props',
  STATE: 'state'
}

const Examples = () => {
  const [selectTopic, setSelectTopic] = useState<string>('')

  const onClick = useCallback(
    (clickTopic: string) => () => {
      setSelectTopic(notUsed => clickTopic)
    },
    []
  )

  let tabContent = <p>TOPIC을 선택해주세요.</p>

  if (selectTopic) {
    tabContent = (
      <div id="tab-content">
        <h3>{EXAMPLES[selectTopic].title}</h3>
        <p>{EXAMPLES[selectTopic].description}</p>
        <pre>
          <code>{EXAMPLES[selectTopic].code}</code>
        </pre>
      </div>
    )
  }

  return (
    <SectionWrap id="examples" title="Examples">
      <Tabs
        buttons={
          <>
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
          </>
        }>
        {tabContent}
      </Tabs>
    </SectionWrap>
  )
}

export default Examples
