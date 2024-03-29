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

## loader()를 이용한 데이터 가져오기

loader는 함수를 값으로 취하는 프로퍼티

일반 함수나 오류 함수를 모두 값으로 취할 수 있다.

loader함수는 이동하기 시작할 때 실행된다. 컴포넌트가 렌더링 된 다음이 아니라 화면이 넘어가기 전에 실행된다.

```jsx
import { Outlet, useNavigation } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";

function RootLayout() {
  const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      <main>
        {navigation.state === "loading" && <p>Loading...</p>}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
```

`useNavigation`의 상태에 따라 처리 방안을 나눠준다. loading하는 상태라면 로딩바가 돌아가고 있는 모습을 보여주면 더 와닿을 것이다. 이에 대한 방안은 추후 다뤄진다고 한다.

## 커스텀 오류를 이용한 오류 처리

```jsx
// EventsPage.jsx
import { useLoaderData } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  const data = useLoaderData();

  // 방안1
  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }

  const events = data.events;

  return <EventsList events={events} />;
}

export default EventsPage;

export async function loader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // 방안1
    // return { isError: true, message: "Could not fetch events." };

    // 방안2 -> route 연결에서 errorElement로 처리됨
    throw { message: "Could not fetch events." };
  } else {
    return response;
  }
}
```

해당 부분을 더 커스텀하게 되면 다음과 같다.

```jsx
// EventsPage.jsx
import { useLoaderData } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  const data = useLoaderData();
  const events = data.events;

  return <EventsList events={events} />;
}

export default EventsPage;

export async function loader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
      status: 500,
    });
  } else {
    return response;
  }
}
```

```jsx
import classes from "./PageContent.module.css";

function PageContent({ title, children }) {
  return (
    <div className={classes.content}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default PageContent;
```

```jsx
// ErrorPage.jsx
import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";

function ErrorPage() {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  } else if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
```

## json() 유틸리티 함수

json형식의 데이터가 포함된 Response객체를 생성하는 함수

react-router-dom의 json을 사용하게 되면 다음과 같이 간결하게 된다.

```jsx
import { useLoaderData, json } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  const data = useLoaderData();
  const events = data.events;

  return <EventsList events={events} />;
}

export default EventsPage;

export async function loader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
}
```

```jsx
import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";

function ErrorPage() {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  } else if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
```
