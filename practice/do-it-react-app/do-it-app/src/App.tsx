import {useClock} from './hooks/useClock'
import ArrayState from './pages/ArrayState'
import Callback from './pages/Callback'
import Clock from './pages/Clock'
import FetchTest from './pages/FetchTest'
import Memo from './pages/Memo'
import RadioInputTest from './pages/RadioInputTest'

function App() {
  const today = useClock()

  return (
    <>
      <Clock today={today} />
      {/* <ClassLifecycleClock />  */}
      {/* 에러 발생
      1. npm install timers-browserly
      2. webpack.config.js에 해당 내용 추가
        ```js
        module.exports = {
          // ...
          resolve: {
            fallback: {
              timers: require.resolve('timers-browserify')
            }
          }
        };
        ```
      */}
      <FetchTest />
      <ArrayState />
      <RadioInputTest />
      <Callback />
      <Memo />
    </>
  )
}

export default App
