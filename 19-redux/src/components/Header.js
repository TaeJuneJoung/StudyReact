import { useSelector, useDispatch } from "react-redux";

import { authActions } from "../store/auth";
import classes from "./Header.module.css";

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(authActions.logout());
  }

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      <nav>
        <ul>
          <li>
            <a href="/">My Products</a>
          </li>
          <li>
            <a href="/">My Sales</a>
          </li>
          <li>
            <button onClick={isAuth ? handleLogout : null}>
              {isAuth ? "Logout" : "Login"}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
