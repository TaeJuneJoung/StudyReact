import {useCallback, useEffect, useRef, useState} from 'react'

import Modal from './components/Modal'
import DeleteConfirmation from './components/DeleteConfirmation'
import Places from './components/Places'
import logoImage from './assets/logo.png'
import {AVAILABLE_PLACES, type PLACES_TYPE} from './data'
import {sortPlacesByDistance} from './util/loc'

const storeIdString = localStorage.getItem('selectedPlaces')
const storeIds: string[] = storeIdString ? JSON.parse(storeIdString) : []
const storePlaces: PLACES_TYPE[] = storeIds
  .map((id: string) => AVAILABLE_PLACES.find(place => place.id === id))
  .filter((place): place is PLACES_TYPE => place !== undefined)

function App() {
  const [availablePlaces, setAvailablePlaces] = useState<PLACES_TYPE[]>([])
  const [pickedPlaces, setPickedPlaces] = useState<PLACES_TYPE[]>(storePlaces)
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const selectedPlace = useRef<string>()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      )
      setAvailablePlaces(sortedPlaces)
    })
  }, [])

  const handleStartRemovePlace = (id: string) => {
    setModalIsOpen(true)
    selectedPlace.current = id
  }

  const handleStopRemovePlace = () => {
    setModalIsOpen(false)
  }

  const handleSelectPlace = (id: string) => {
    setPickedPlaces(prevPickedPlaces => {
      if (prevPickedPlaces.some(place => place.id === id)) {
        return prevPickedPlaces
      }
      const place = AVAILABLE_PLACES.find(place => place.id === id)
      if (!place) return prevPickedPlaces // prevPickedPlaces가 undefined일 때 처리
      return [...prevPickedPlaces, place]
    })

    const storeIdString = localStorage.getItem('selectedPlaces')
    const storeIds = storeIdString ? JSON.parse(storeIdString) : []
    if (storeIds.indexOf(id) === -1) {
      localStorage.setItem('selectedPlaces', JSON.stringify([id, ...storeIds]))
    }
  }

  const handleRemovePlace = useCallback(() => {
    setPickedPlaces(prevPickedPlaces =>
      prevPickedPlaces.filter(place => place.id !== selectedPlace.current)
    )
    setModalIsOpen(false)

    const storeIdString = localStorage.getItem('selectedPlaces')
    const storeIds = storeIdString ? JSON.parse(storeIdString) : []
    localStorage.setItem(
      'selectedPlaces',
      JSON.stringify(storeIds.filter((id: string) => id !== selectedPlace.current))
    )
  }, [])

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onConfirm={handleRemovePlace}
          onCancel={handleStopRemovePlace}
        />
      </Modal>
      <header>
        <img src={logoImage} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or you have
          visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  )
}

export default App
