import {ResponsiveProvider} from './contexts'
import ResponsiveContextTest from './pages/ResponsiveContextTest'

function App() {
  return (
    <ResponsiveProvider>
      <main>
        <ResponsiveContextTest />
      </main>
    </ResponsiveProvider>
  )
}

export default App
