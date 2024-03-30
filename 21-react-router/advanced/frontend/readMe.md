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

```jsx
// EventDetailPage.jsx
import { useLoaderData, json } from "react-router-dom";
import EventItem from "../components/EventItem";

function EventDetailPage() {
  const data = useLoaderData();
  const event = data.event;

  return <EventItem event={event} />;
}

export default EventDetailPage;

export async function loader({ request, params }) {
  const id = params["some-id"];
  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      { status: 500 }
    );
  } else {
    return response;
  }
}
```

loader함수에는 `request, params`가 파라미터가 있기에 해당 부분을 이용해서 id값을 가져왔다.

## useRouterLoaderData

게시물에 들어가서 해당 게시물을 수정하기 위해서는 id값이 필요하다. 그래서 당연히 id값을 통한 재요청으로 진행할 것이라고 생각했는데 더 편리한 방향이 있다. (실로 로직을 보면 똑같긴 하겠지만 함수는 하나를 이용하니..)

```jsx
// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage

// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage

// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventsPage, { loader as eventsLoader } from "./pages/EventsPage";
import EventDetailPage, {
  loader as eventDetailLoader,
} from "./pages/EventDetailPage";
import NewEventPage from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import EventsRoot from "./pages/EventsRoot";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRoot />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ":some-id",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              { index: true, element: <EventDetailPage /> },
              { path: "edit", element: <EditEventPage /> },
            ],
          },
          { path: "new", element: <NewEventPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

`children`을 통하여 하위 개념으로 두어 loader를 이용할 수 있게 해주었다. 그리고 element는 두지 않았다. 공통된 레이아웃 또는 그와 비슷한걸 원하지 않기 때문이다.

그리곤 `useLoaderData`을 사용하면 가장 상위에 loader를 사용하기에 문제가 발생한다. 그래서 `id`값을 주어서 해당 id에 있는 loader속성을 사용하게 하였다. 이에 필요한 것은 `useRouterLoaderData(id값)`이다.

```jsx
import { json, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

function EventDetailPage() {
  const data = useRouteLoaderData("event-detail");
  const event = data.event;

  return <EventItem event={event} />;
}

export default EventDetailPage;

export async function loader({ request, params }) {
  const id = params["some-id"];
  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      { status: 500 }
    );
  } else {
    return response;
  }
}
```

작성하는 form에서는 input데이터에 `defaultValue`를 통해서 삼항연산자 처리 하였다.

```jsx
<input
  id="title"
  type="text"
  name="title"
  required
  defaultValue={event ? event.title : ""}
/>
```

## action함수

```jsx
// App.jsx
{ path: "new", element: <NewEventPage />, action: newEventAction },
```

action을 추가해주었다. 그리고 NewEventPage에 해당 action 함수를 작성하였다.

```jsx
import { json, redirect } from "react-router-dom";
import EventForm from "../components/EventForm";

function NewEventPage() {
  return <EventForm />;
}

export default NewEventPage;

export async function action({ request, params }) {
  const data = await request.formData();

  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    throw json(
      {
        message: "Could not save event.",
      },
      { status: 500 }
    );
  }

  return redirect("/events");
}
```

action함수에도 동일하게 request와 params가 있어서 form의 값을 가져올 때 `request.formData()`을 이용.

react-router-dom라이브러리에 `redirect`를 이용하여 성공하면 이동하게 하였다.

이전에 쓰던 form형태는 변화가 생겼다.

```jsx
// EventForm.jsx
import { Form, useNavigate } from "react-router-dom";

// form -> react-router-dom에 있는 Form으로 변경됨 closed tag까지 변경
<Form method="POST" className={classes.form}>
```

Form으로 변경하면서 생긴 이점은 action을 연결해준 적이 없는데 form과 연결되었다는 점이다.

그러면 loader와 동일하게 구분을 해줘야할 때도 있지 않을까 싶었는데 `<Form action=''>`으로 action속성이 있었다.

### Form이 없다면 어떻게 할 것인가?

delete를 예시로 보면 form이 없이 버튼을 눌러서 modal창이나 confirm창이 나와서 처리된다.

이렇게 되면 자동적으로 action을 연결 시켜주지 못하기에 `useSubmit`을 사용할 수 있다.

```jsx
import { Link, useSubmit } from "react-router-dom";
import classes from "./EventItem.module.css";

function EventItem({ event }) {
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      // submit(제출하려는 데이터, submit옵션)
      /* submit옵션 예시
       * {method: 'delete', action: 'id값'}
       */
      submit(null, {
        method: "delete",
      });
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
```

```jsx
// EventDetailPage.jsx의 action 부분
export async function action({ params, request }) {
  const id = params["some-id"];
  const response = await fetch(`http://localhost:8080/events/${id}`, {
    method: request.method,
  });

  if (!response.ok) {
    throw json(
      {
        message: "Could not delete event.",
      },
      { status: 500 }
    );
  }

  return redirect("/events");
}
```

submit에서 method를 delete로 하였기에 request를 통해서 해당 값을 가져와 처리했다.
