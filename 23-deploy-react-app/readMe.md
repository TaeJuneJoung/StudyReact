# Deploy React-App

## 지연 로딩 추가하기

Lazy Loading...

`<Suspense>` 리액트에서 제공하는 컴포넌트로 다른 컴포넌트에 사용해 실제로 콘텐츠를 렌더링하기 전에 콘텐츠의 로딩을 기다리는 데 사용할 수 있다.

```jsx
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home";
// import PostPage, { loader as postLoader } from "./pages/Post"; // 지연 로딩 적용
import RootLayout from "./pages/Root";

const BlogPage = lazy(() => import("./pages/Blog"));
const PostPage = lazy(() => import("./pages/Post"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "posts",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <BlogPage />
              </Suspense>
            ),
            loader: () =>
              import("./pages/Blog").then((module) => module.loader()),
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <PostPage />
              </Suspense>
            ),
            loader: (meta) =>
              import("./pages/Post").then((module) => module.loader(meta)),
          },
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

🤔TODO: 지연 로딩을 왜 사용하는가? 특별히 달라진 점을 잘 모르겠음.

## 프로덕션용 코드 빌드하기

```bash
npm run build
```

🤔TODO: 해당 부분은 firebase를 통한 배포를 설명하고 있는데 이외에 AWS나 다른 클라우드 컴퓨팅을 이용한 배포를 알아야함.
