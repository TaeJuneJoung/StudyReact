import { useRef, useState } from "react";

export default function Login() {
  const email = useRef();
  const password = useRef();

  const [emailIsInvalid, setEmailIsInvaild] = useState(false);

  function handleSumbit(event) {
    event.preventDefault();

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    const emailIsValid = enteredEmail.includes("@");

    if (!emailIsValid) {
      setEmailIsInvaild(true);
      return;
    }

    setEmailIsInvaild(false);

    console.log("Sending HTTP request");

    email.current.value = "";
    password.current.value = "";
  }

  return (
    <form onSubmit={handleSumbit}>
      <h2>Login</h2>
      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={email} />
          <div className="control-error">
            {emailIsInvalid && <p>Please enter a valid email address.</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" ref={password} />
        </div>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
