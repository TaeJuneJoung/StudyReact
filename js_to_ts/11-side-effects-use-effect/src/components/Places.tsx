import {type FC, type ReactElement} from 'react'
import type {PLACES_TYPE} from '../data'

type PlacesType = {
  title: string
  places: PLACES_TYPE[]
  fallbackText?: string
  onSelectPlace: (id: string) => void
}

const Places: FC<PlacesType> = ({title, places, fallbackText, onSelectPlace}) => {
  let content: ReactElement = <p className="fallback-text">{fallbackText}</p>

  if (places.length > 0) {
    content = (
      <ul className="places">
        {places.map(place => (
          <li key={place.id} className="place-item">
            <button onClick={() => onSelectPlace(place.id)}>
              <img src={place.image.src} alt={place.image.alt} />
              <h3>{place.title}</h3>
            </button>
          </li>
        ))}
      </ul>
    )
  }
  return (
    <>
      <section className="places-category">
        <h2>{title}</h2>
        {content}
      </section>
    </>
  )
}

export default Places
