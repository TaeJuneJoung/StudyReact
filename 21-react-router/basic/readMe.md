# React Router

https://reactrouter.com/en/main

```bash
npm install react-router-dom
```

```jsx
// React Router < 6.4
function App() {
  return (
    <div>
      <Route path="welcome">
        <Welcome />
      </Route>
      <Route path="products">
        <Products />
      </Route>
    </div>
  );
}
```

```jsx
// React Router 방법1
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from "./pages/Home";
import Products from "./pages/Products";

const routeDefinitions = createRoutesFromElements(
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/products" element={<Products />} />
  </Routes>
);

const router = createBrowserRouter(routeDefinitions);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

```jsx
// React Router 방법2: 해당 방안으로 진행
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import Products from "./pages/Products";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  {
    path: "/products",
    element: <Products />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

## Link로 페이지들 간에 이동하기

`<a href=''>`와 `<Link to=''>`의 차이는 무엇일까?

Link는 URL을 변경하지만 새로운 HTTP요청을 전송하지는 않는다.

`a href`는 HTTP요청이 전송되기에 redirect효과가 이뤄진다.

## 레이아웃 및 중첩된 라우트

라우트 안에서 자식으로 나뉠 때는 다음과 같이 진행한다.

```jsx
// App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import Products from "./pages/Products";
import RootLayout from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/products",
        element: <Products />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

```jsx
import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

import classes from "./Root.module.css";

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main className={classes.content}>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
```

🤔TODO: Outlet이란 무엇인가?

## errorElement로 오류 페이지 표시하기

정해져 있지 않은 path를 작성하게 되면 에러가 발생하게 된다.

이럴때 어떻게 개발자가 의도한 페이지로 넘겨줄 것인가?

`errorElement` 속성을 통해서 추가해줄 수 있다.

```jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import Products from "./pages/Products";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/products",
        element: <Products />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

## 네비게이션 링크(NavLink) 사용하기

Link와 NavLink의 차이점은 무엇인가?

링크를 눌러서 이동했으면 어디 위치에 이동했는지 표시를 해주고 싶다.

그런데 Link를 통해서는 해당 부분이 안되어 NavLink를 사용

- 누른 후 하이라이팅 되기 원하면 NavLink
- 아니면 Link

```jsx
// MainNavigation.jsx : Link 사용코드
import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
```

```jsx
// MainNavigation.jsx : NavLink 사용코드
import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
```

NavLink에서는 react-router-dom이 `isActive`를 제공해준다.
`end`는 현재 활성인 라우트의 URL 뒤가 이 경로로 끝나면 이 링크를 활성으로 간주해야 한다는 것이다.

🤔TODO: end 왜 써?

## 프로그램적으로 네비게이션하기

```jsx
// Home.jsx
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  function navigateHandler() {
    navigate("/products");
  }

  return (
    <>
      <h1>My Home Page</h1>
      <p>
        Go to <Link to="/products">Products</Link>
      </p>
      <p>
        <button onClick={navigateHandler}>Navigate</button>
      </p>
    </>
  );
}

export default HomePage;
```

button을 눌렀을 때 백엔드에 통신을 하는 데이터를 보내고 이후에 초기 화면으로 보내는 작업을 한다고 할 때 사용하면 될 기능.

## 동적 라우트 정의하고 사용하기

```jsx
// App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import Products from "./pages/Products";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import ProductDetailPage from "./pages/ProductDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:productId",
        element: <ProductDetailPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

`:param이름`으로 정해주었다.

```jsx
// Products.jsx
import { Link } from "react-router-dom";

const PRODUCTS = [
  { id: "p1", title: "Product 1" },
  { id: "p2", title: "Product 2" },
  { id: "p3", title: "Product 3" },
];

function Products() {
  console.log("Products");
  return (
    <>
      <h1>Products</h1>;
      <ul>
        {PRODUCTS.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Products;
```

```jsx
// ProductDetail.jsx
import { useParams } from "react-router-dom";

function ProductDetailPage() {
  const params = useParams();

  return (
    <>
      <h1>Product Details!</h1>
      <p>{params.productId}</p>
    </>
  );
}

export default ProductDetailPage;
```

그렇게 하고 useParams 함수를 통해서 params를 받고 받은 키워드와 같이 사용하면 된다.

여기서 고려해야할 점이 생긴다.
🤔TODO: **동적 라우트**

1. 없는 id값을 작성했을 때 처리는 어떻게 할 것인가?
2. 데이터들은 어떻게 가져올 것인가? id값을 기반으로 fetch를 해서 적용시키나? (가장 일반적 방법일듯한데..)

## 상대 경로와 절대 경로

```jsx
// 절대 경로 -> /
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:productId",
        element: <ProductDetailPage />,
      },
    ],
  },
]);
```

```jsx
// 상대 경로 -> children 요소에는 /로 시작하지 않음
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:productId",
        element: <ProductDetailPage />,
      },
    ],
  },
]);
```

상대 경로의 문제점은 한번 주소가 틀리게 되면 현 경로를 대상으로 계속 상대경로라서 문제가 된다.
Link에서는 relative 프로퍼티를 제공하여 path와 route 중에 하나로 설정할 수 있다.
기본값(default)은 route이다.

```jsx
import { Link, useParams } from "react-router-dom";

function ProductDetailPage() {
  const params = useParams();

  return (
    <>
      <h1>Product Details!</h1>
      <p>{params.productId}</p>
      <p>
        <Link to=".." relative="path">
          Back
        </Link>
      </p>
    </>
  );
}

export default ProductDetailPage;
```

`relative`를 설정하지 않거나 route로 하면 Products -> ProductDetail로 갔다고 해도 Back을 클릭시 Root로 가게 된다. Products로 가기 위해서는 위와 같이 relative를 path로 설정해주어야 한다.

## 인덱스 라우트 사용하기

```jsx
// App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import Products from "./pages/Products";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import ProductDetailPage from "./pages/ProductDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:productId",
        element: <ProductDetailPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

children 요소에 path가 아닌 `index: true`로 주어서 기본 root router에 적용되게 하는 방안이 있다.
