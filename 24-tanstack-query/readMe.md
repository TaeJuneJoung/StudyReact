# Tanstack Query

https://tanstack.com/query/latest

예전에 react-query라고 불리였는데 지금은 tanstack-query라고 한다.

해당 라이브러리를 사용하면 리액트 앱 내부에서 HTTP요청을 간편하게 보낼 수 있다.

기존에는 `useEffect`를 사용하거나 `fetch`를 사용하였는데 `tanstack-query`를 사용하면서 이점을 살펴보자.

## install

```bash
npm install @tanstack/react-query
```

Tanstack Query에는 HTTP 요청을 전송하는 로직이 내장되어 있지 않다. 대신에 요청을 관리하는 로직을 제공한다.

`queryKey`를 이용하여 요청으로 생성된 데이터를 캐시 처리한다. 이후 동일한 요청을 전송하면 재사용할 수 있다.

```js
useQuery({
  queryKey: ["events"],
  queryFn: fetchEvents,
});
```

queryKey값은 배열에 여러개를 넣을 수도 있다. 또한, 문자타입이 아닌 다른 타입도 가능하다. (ex. 객체)

- data
- isPending: 요청이 실행 중인지 응답을 받았는지 Boolean값
- isError: 응답을 받은게 무조건 데이터가 아니라 에러일 수도 있다.
- error: 발생한 오류에 대한 정보
- refetch: 동일한 쿼리를 다시 전송할 수 있다.

```jsx
// App.jsx
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import Events from "./components/Events/Events.jsx";
import EventDetails from "./components/Events/EventDetails.jsx";
import NewEvent from "./components/Events/NewEvent.jsx";
import EditEvent from "./components/Events/EditEvent.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/events" />,
  },
  {
    path: "/events",
    element: <Events />,

    children: [
      {
        path: "/events/new",
        element: <NewEvent />,
      },
    ],
  },
  {
    path: "/events/:id",
    element: <EventDetails />,
    children: [
      {
        path: "/events/:id/edit",
        element: <EditEvent />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}

export default App;
```

`QueryClient`와 `QueryClientProvider`를 적용해줘야 한다.

```jsx
// util/http.js
export async function fetchEvents() {
  const response = await fetch("http://localhost:3000/events");

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}
```

```jsx
// components/Events/NewEventsSection.jsx
import { useQuery } from "@tanstack/react-query";

import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EventItem from "./EventItem.jsx";
import { fetchEvents } from "../../util/http.js";

export default function NewEventsSection() {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Failed to fetch events."}
      />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
```

이렇게만 하였는데도 다른 탭을 눌렀다가 돌아오면 refetch가 된다.

데이터가 변화가 생기면 다른 작업 한 후에 탭에 돌아오면 그에 맞게 적용이 됨.
