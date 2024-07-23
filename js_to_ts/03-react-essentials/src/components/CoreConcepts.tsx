import SectionWrap from './SectionWrap'
import {CoreConcept} from './CoreConcept'
import {CORE_CONCEPTS} from '../data'

const CoreConcepts = () => {
  return (
    <SectionWrap id="core-concepts" title="Core Concepts">
      <ul>
        {CORE_CONCEPTS.map(conceptItem => (
          <CoreConcept key={conceptItem.title} {...conceptItem} />
        ))}
      </ul>
    </SectionWrap>
  )
}

export default CoreConcepts
