import ArrowComponent from './components/ArrowComponent'
import FileInputComponent from './components/FileInputComponent'
import StopPropagation from './pages/StopPropagation'

function App() {
  return (
    <>
      <ul>
        <ArrowComponent href="https://google.com" text="구글" />
      </ul>
      <StopPropagation />
      <FileInputComponent />
    </>
  )
}

export default App
