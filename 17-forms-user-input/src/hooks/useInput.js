import { useState } from "react";

export function useInput(defaultValue, validationFunc) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFunc(enteredValue);

  function handleInputChage(event) {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  }

  function handleInputBlur() {
    setDidEdit(true);
  }

  return {
    value: enteredValue,
    handleInputChage,
    handleInputBlur,
    hasError: didEdit && !valueIsValid,
  };
}
