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
