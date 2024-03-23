import { useState } from "react";

import Input from "./Input";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation";

export default function Login() {
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  const emailIsInvalid =
    didEdit.email &&
    !isEmail(enteredValues.email) &&
    !isNotEmpty(enteredValues.email);
  const passwordlIsInvalid =
    didEdit.password && !hasMinLength(enteredValues.password, 6);

  function handleSumbit(event) {
    event.preventDefault();

    // 제출시 유효성 검증 추가해주는 것이 좋음
  }

  function handleInputChage(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));

    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: false,
    }));
  }

  function handleInputBlur(identifier) {
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: true,
    }));
  }

  return (
    <form onSubmit={handleSumbit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          error={emailIsInvalid && "Please enter a valid email!"}
          onBlur={() => handleInputBlur("email")}
          value={enteredValues.email}
          onChange={(event) => handleInputChage("email", event.target.value)}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          error={passwordlIsInvalid && "Please enter a valid password!"}
          onBlur={() => handleInputBlur("password")}
          value={enteredValues.password}
          onChange={(event) => handleInputChage("password", event.target.value)}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
