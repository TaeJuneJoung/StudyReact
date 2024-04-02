# Tanstack Query

https://tanstack.com/query/latest

예전에 react-query라고 불리였는데 지금은 tanstack-query라고 한다.

해당 라이브러리를 사용하면 리액트 앱 내부에서 HTTP요청을 간편하게 보낼 수 있다.

기존에는 `useEffect`를 사용하거나 `fetch`를 사용하였는데 `tanstack-query`를 사용하면서 이점을 살펴보자.

## install

```bash
npm install @tanstack/react-query
```

## Tanstack Query 적용

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

```js
const { data, isPending, isError, error, refetch } = useQuery({
  queryKey: ["events"],
  queryFn: fetchEvents,
  staleTime: 0,
  gcTime: 300000,
});
```

이미지는 브라우저가 캐싱하고 다른 글 데이터들은 tanstack-query(react-query)가 캐싱한다.

`staleTime`의 값이 0(기본값)이면 즉시 캐싱하는 방식이며, 5000이라고 하면 5000ms(=5초) 후에나 fetch가 이뤄진다.

`gcTime`은 garbage collect Time으로 데이터와 캐시를 얼마나 오래 보관할지를 나타내며 기본값은 5분이다. 해당 값도 ms를 사용하고 있다. 30000이면 30초를 의미한다. 짧게 설정하면 해당 초 이후에 다시 데이터를 요청하는 것을 알 수 있다.

🤔TODO: staleTime과 gcTime에 대해서 조금 더 자세히 알면 좋을듯 -> 전체적 useQuery에 대해서 살펴볼 것

```jsx
// FindEventSction.jsx
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { fetchEvents } from "../../util/http";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorBlock";
import EventItem from "./EventItem";

export default function FindEventSection() {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", { search: searchTerm }],
    queryFn: () => fetchEvents(searchTerm),
  });

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  }

  let content = <p>Please enter a search term and to find events.</p>;

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
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
```

`searchElement.current.value`을 쓰면 되는 것을 왜 useState를 만들어서 사용했는가?

-> 리액트의 상태와는 달리 ref는 컴포넌트 함수가 다시 실행되도록 할 수 없기 때문이다. 그렇기에 입력창에 입력된 값이 변경되어도 useQuery는 업데이트 되거나 다시 전송되지 않는다. 그래서 useState를 구성한 후에 버튼을 눌러 이벤트가 발생하면 상태 변화를 줌.

```js
const { data, isPending, isError, error } = useQuery({
  queryKey: ["events", { search: searchTerm }],
  queryFn: ({ signal }) => fetchEvents({ signal, searchTerm }),
  enabled: searchTerm !== "",
});
```

- enabled: true - 요청이 전송(default) / false - 쿼리가 비활성화되고 요청이 전송되지 않음
- isLoading: 쿼리가 비활성화됐다고 해서 True가 되지는 않는다.

## useMutation

`useQuery`를 통해서 method: POST를 보낼 수도 있지만 데이터를 변경하는 쿼리로 useMutation이 최적화다.

useQuery와 달리 요청이 즉시 전송되지 않도록 할 수 있다.

key값은 반드시 필요하지 않다. 변형은 응답 데이터를 캐시 처리하지 않기 때문이다.

- mutate: 요청을 언제 시작할 것인지 mutate함수로 지정
