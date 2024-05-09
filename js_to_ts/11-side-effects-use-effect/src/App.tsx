import Places from './components/Places'

import {AVAILABLE_PLACES, PLACES_TYPE} from './data'
import logoImage from './assets/logo.png'
import {useRef, useState} from 'react'
import Modal from './components/Modal'
import DeleteConfirmation from './components/DeleteConfirmation'

function App() {
  const [pickedPlaces, setPickedPlaces] = useState<PLACES_TYPE[]>([])
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const selectedPlace = useRef<string>()

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
  }

  const handleRemovePlace = () => {
    setPickedPlaces(prevPickedPlaces =>
      prevPickedPlaces.filter(place => place.id !== selectedPlace.current)
    )
    setModalIsOpen(false)
  }

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
          places={AVAILABLE_PLACES}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  )
}

export default App
