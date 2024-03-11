import { useState } from "react";

import UserInput from "./components/UserInput";
import Results from "./components/Results";

const INVESTMENT_DATA = {
  initialInvestment: 10000,
  annualInvestment: 1200,
  expectedReturn: 6,
  duration: 10,
};

function App() {
  const [userInput, setUserInput] = useState(INVESTMENT_DATA);

  const inputIsValid = userInput.duration >= 1;

  function handleChange(inputIdentifier, newValue) {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        [inputIdentifier]: +newValue, // +안해주면 문자열 덧셈이 되어 옳바르지 않게 된다.
      };
    });
  }

  return (
    <>
      <UserInput userInput={userInput} onChange={handleChange} />
      {!inputIsValid && (
        <p className="center">Please enter a duration greater than zero.</p>
      )}
      {inputIsValid && <Results userInput={userInput} />}
    </>
  );
}

export default App;
