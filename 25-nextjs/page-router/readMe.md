# Page Router

## 중첩 경로 및 페이지 추가하기(중첩 경로)

동적 페이지를 만들기 위해서는 `[식별명]`으로 파일이나 폴더를 만들면 된다. 폴더를 만들게 된다면 안에 index.js로 파일이름을 하면 된다.

```js
// news/[newsId].js
import { useRouter } from "next/router";

function DetailPage() {
  const router = useRouter();

  const newsId = router.query.newsId;

  return (
    <>
      <h1>The Detail Page</h1>
      <p>{newsId}</p>
    </>
  );
}

export default DetailPage;
```

## 정적 페이지에 대한 데이터 가져오기

```js
export function getStaticProps() {}
```

컴포넌트 함수를 바로 호출하지 않고 반환된 JSX 스냅샷을 HTML 콘텐츠로 사용한다.

컴포넌트 함수를 호출하기 전에 getStaticProps 함수를 호출한다.

함수 `getStaticProps`는 NextJs에서 자동으로 탐지하기에 함수명이 달라서는 안된다.

비동기적으로 사용할 수 도 있다.

```js
export async function getStaticProps() {}
```

이렇게 하면 컴포넌트 함수가 실행되기 전에 데이터를 읽어 들일 수 있어 컴포넌트에 필요한 데이터와 함께 랜더링할 수 있다.

그리고 항상 객체를 반환해야 한다.

```js
// index.js
import MeetupList from "@/components/meetups/MeetupList";
import { useEffect, useState } from "react";

const DUMMY_LIST = [
  // ...
];

function HomePage() {
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setLoadedMeetups(DUMMY_LIST);
  }, []);

  return <MeetupList meetups={loadedMeetups} />;
}

export default HomePage;
```

이렇게 되어 있어서 state 변화에 따라 다시 랜더링 되는 형태에서 다음과 같이 변화될 수 있으며, 검색엔진(SEO) 차원에서 더 낫다.

```js
import MeetupList from "@/components/meetups/MeetupList";

const DUMMY_LIST = [
  // ...
];

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

export async function getStaticProps() {
  // fetch data from an API
  return {
    props: {
      meetups: DUMMY_LIST,
    },
  };
}

export default HomePage;
```

여기서도 데이터가 자주 변하게 되면 배포 상태에서는 적용에서 문제가 발생한다.

그래서 이전과 같이 `revalidate`를 사용하는 방안이 있다.

여기에서 revalidate에는 숫자가 필요한데 10이라고 한다면 이 숫자는 요청이 들어로 때 이 페이지를 다시 생성할 때까지 NextJs가 대기하는 시간을 초 단위로 표시한 것이다.

```js
export async function getStaticProps() {
  // fetch data from an API
  return {
    props: {
      meetups: DUMMY_LIST,
    },
    revalidate: 10,
  };
}
```

주기적 업데이트 보다는 요청이 들어올 때마다 페이지를 다시 만들어야 하는 경우도 있다. 이럴 때는 `getServerSideProps`를 사용하면 된다.

```js
export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;

  // fetch data from an API
  return {
    props: {
      meetups: DUMMY_LIST,
    },
  };
}
```

`getServerSideProps`를 쓰면 요청이 들어올 때마다 페이지를 다시 만드니 이게 더 빠르다고 생각이 들지만, 요청 객체에 접속할 필요가 없다면 `getStaticProps`가 더 낫다. 여기서는 HTML파일을 프리 제너레이트하기 때문이다. 해당 파일은 CDN에 저장되고 제공된다. 그래서 요청이 들어올 때마다 다시 만들고 패치하는 것보다 빠르다. 캐시하고 다시 사용하는 `getStaticProps`가 더 빠르다.

🤔TODO: `getStaticProps` vs. `getServerSideProps`

## getStaticPaths로 경로 준비 및 대체 페이지 작업하기

```js
// pages/[meetupId]/index.js
import MeetupDetail from "@/components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return <MeetupDetail />;
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  return {
    props: {
      meetupData: {
        id: meetupId,
        title: "",
        image: "",
        address: "",
        description: "",
      },
    },
  };
}

export default MeetupDetails;
```

이렇게만 작성되었을 때 `getStaticPaths is required for dynamic SSG pages and is missing for...` 이런식으로 에러가 발생한다.

🤔TODO: `getStaticPaths`란?
