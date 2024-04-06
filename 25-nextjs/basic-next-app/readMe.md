# Next.js

## 파일 시스템을 통한 추가 경로 추가

- page.js: Define page content
- layout.js: Define wrapper around pages
- not-found.js: Define "Not Found" fallback page
- error.js: Define "Error" fallback page

등...

> - page.js: 페이지 내용 정의
> - layout.js: 페이지 주위에 래퍼 정의
> - not-found.js: "찾을 수 없음" 대체 페이지 정의
> - error.js: "오류" 대체 페이지 정의

## 페이지 간 이동

a link를 사용하는 것이 아닌 React에서 사용했던 것처럼 `Link` 사용

```js
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <img src="/next.svg" alt="A server surrounded by magic sparkles." />
      <h1>Welcome to this NextJS Course!</h1>
      <p>🔥 Let&apos;s get started! 🔥</p>
      <p>
        <Link href="/about">About Us</Link>
      </p>
    </main>
  );
}
```

import만 `next/link`에서 가져온다.
