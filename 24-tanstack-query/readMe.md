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
- onSuccess: 변형이 성공한 경우에만 실행

> **🐛ISSUE**
>
> 초기 화면은 나오는데 Network에서 events `strict-origin-when-cross-origin` 에러가 발생했다. 이유를 살펴보다가 `React.StrictMode`모드이기에 엄격하게 확인하면서 생기는 문제가 아닐까 했더니 해당 이슈였다.

## 동작 성공 시 동작 및 쿼리 무효화

```js
const { mutate, isPending, isError, error } = useMutation({
  mutationFn: createNewEvent,
  onSuccess: () => {
    navigate("/events");
  },
});
```

이렇게만 하고 생성을 하게 되면 생성된 게시물이 바로 적용이 안되어 안보인다. 그래서 적용될 수 있게 다른 쿼리 무효화를 해줘야 한다.

QueryClient를 통해서 쿼리 무효화를 해줄 수 있다.

App.jsx에 있던 QueryClient를 http.js에 선언해주었고 App.jsx는 export된 값을 우선 받았다.

또한, NewEvent.jsx에서도 가져와서 아래와 같이 해주었다.

```jsx
// NewEvent.jsx
const { mutate, isPending, isError, error } = useMutation({
  mutationFn: createNewEvent,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["events"], exact: true });
    navigate("/events");
  },
});
```

queryKey가 일치하는 것들을 다 무효화해서 데이터를 다시 가져오게 처리하였다. `exact`를 true로 하면 queryKey가 일치하는 거에 대해서만 적용된다. queryKey를 `events`로 사용하고 있으나 `queryKey: ["events", { search: searchTerm }],` 이런식으로 되어 있는 key값은 적용이 안된다는 뜻이다. 그러나 여기서는 events 관련된 모든 쿼리를 무효화하는게 적절하여 exact를 사용하지 않았다.

## 무효화 후 자동 다시 가져오기 비활성화

```jsx
// EventDetails.jsx
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

import Header from "../Header.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteEvent, fetchEvent } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { queryClient } from "../../util/http.js";

export default function EventDetails() {
  const params = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
    staleTime: 5000,
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      navigate("/events");
    },
  });

  function eventDeleteHandler() {
    deleteMutate({ id: params.id });
  }

  let content;

  if (isPending) {
    content = (
      <div id="event-details-content" className="center">
        <p>Fetching event data...</p>
      </div>
    );
  }

  if (isError) {
    content = (
      <div id="event-details-content" className="center">
        <ErrorBlock
          title="Failed to load event"
          message={
            error.info?.message ||
            "Failed to fetch event data, please try again later."
          }
        />
      </div>
    );
  }

  if (data) {
    const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={eventDeleteHandler}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={"http://localhost:3000/" + data.image} alt={data.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {formattedDate} @ {data.time}
              </time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </>
  );
}
```

이렇게만 작성하게 되면 삭제 후에 `/events`화면으로 오게 되었을 때 삭제한 event도 다시 불러오려고 하면서 네트워크에는 에러가 하나 발생하게 된다.

```js
const { mutate: deleteMutate } = useMutation({
  mutationFn: deleteEvent,
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["events"],
      refetchType: "none",
    });
    navigate("/events");
  },
});
```

`refetchType: 'none'`으로 하게 되면 해당 부분에 대해서는 가져오지 않게 된다.

## 낙관적 업데이트

`queryClient.invalidateQueries`방식을 사용하면 수정도 동일하게 적용은 되지만 백엔드의 응답을 기다리지 않고 즉시 변경하려고 한다. 이후 백엔드 적용 실패시 롤백하는 방안으로 진행.

- onMutate: mutate를 호출하는 즉시 실행된다.

`queryClient.setQueryData(편집하려는 query의 키, 새 데이터)`

```js
const { mutate } = useMutation({
  mutationFn: updateEvent,
  onMutate: async (data) => {
    const newEvent = data.event;

    await queryClient.cancelQueries({ queryKey: ["events", params.id] });
    const previousEvent = queryClient.getQueryData(["events", params.id]);

    queryClient.setQueryData(["events", params.id], newEvent);

    return { previousEvent };
  },
  onError: (error, data, context) => {
    queryClient.setQueryData(["events", params.id], context.previousEvent);
  },
  onSettled: () => {
    // 성공여부 상관없이 mutation이 완료될 때마다 호출됨
    queryClient.invalidateQueries(["events", params.id]);
  },
});

function handleSubmit(formData) {
  mutate({ id: params.id, event: formData });
  navigate("../");
}
```

## 쿼리 키를 쿼리 함수 입력으로 사용

```js
const { data, isLoading, isError, error } = useQuery({
  queryKey: ["events", { searchTerm: searchTerm }],
  queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }),
  enabled: searchTerm !== undefined,
});
```

🤔TODO: queryKey를 쓰는 것은 이해가 되는데 signal은 어디서 나온거지...?
