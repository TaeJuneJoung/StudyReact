# FrontEnd

## install library

```bash
npm install react-router-dom
```

## 진행하면서 빼먹었던 부분

- Root Layout
- App.jsx에 root element

- :warning:이동할 id값이 숫자면 안되었음

```jsx
import { Link } from "react-router-dom";

const DUMMY_EVENTS = [
  { id: "1", title: "First Event" }, // 해당 id 타입이 숫자면 안됨
  { id: "2", title: "Second Event" },
];

function EventsPage() {
  return (
    <>
      <h1>EventsPage</h1>
      <ul>
        {DUMMY_EVENTS.map((element) => (
          <li key={element.id}>
            <Link to={element.id}>{element.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default EventsPage;
```

- BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

해당 부분 못함.

- NavLink를 통한 활성화 할 때 주의할 점

```jsx
import { NavLink } from "react-router-dom";
import classes from "./EventsNavigation.module.css";

function EventsNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              All Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events/new"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              New Event
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;
```

1. `( { isActive } )` 이렇게 작성되어야 한다. `(isActive)` 아님
2. 화살표 함수 다음에 return 값이기에 `{}`가 아닌 `()`이거나 없어야 한다.
