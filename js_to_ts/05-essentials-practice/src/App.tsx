import {useState} from 'react'

import type {INVESTMENT_TYPE} from './util/investment'
import UserInput from './components/UserInput'
import Results from './components/Results'

const INVESTMENT_DATA: INVESTMENT_TYPE = {
  initialInvestment: 10000,
  annualInvestment: 1200,
  expectedReturn: 6,
  duration: 10
}

function App() {
  const [userInput, setUserInput] = useState<INVESTMENT_TYPE>(INVESTMENT_DATA)

  const inputIsValid = userInput.duration > 0

  const handleChange = (identifier: string, newValue: number) => {
    setUserInput(prevUserInput => {
      return {
        ...prevUserInput,
        [identifier]: newValue
      }
    })
  }

  return (
    <>
      <UserInput userInput={userInput} onChange={handleChange} />
      {!inputIsValid && (
        <p className="center">Please enter a duration greater than zero.</p>
      )}
      {inputIsValid && <Results userInput={userInput} />}
    </>
  )
}

export default App
