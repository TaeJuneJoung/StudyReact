# 연습 프로젝트

## Exercise

### Create three routes

- /meals
- /meals/share
- /community

### Create a dynamic route

- /meals/<some slug>

## NextJS 이미지 컴포넌트를 통한 이미지 최적화

https://nextjs.org/docs/app/api-reference/components/image

```js
import Link from "next/link";

import logoImg from "@/assets/logo.png";
import classes from "./main-header.module.css";

export default function MainHeader() {
  return (
    <header className={classes.header}>
      <Link className={classes.logo} href="/">
        <img src={logoImg.src} alt="A plate with food on it" />
        NextLevel Food
      </Link>

      <nav className={classes.nav}>
        <ul>
          <li>
            <Link href="/meals">Meals</Link>
          </li>
          <li>
            <Link href="/community">Community</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
```

Image 태그 방식을 사용하면서 다음과 같이 달라졌다.

이미지 자체를 효율적인 방식으로 변환해서 보여준다. 확장자를 png로 사용했더라도 사용자의 브라우저의 효율에 따라 `.webp`로 자동으로 변환하여 제공해준다.

```js
import Link from "next/link";
import Image from "next/image";

import logoImg from "@/assets/logo.png";
import classes from "./main-header.module.css";

export default function MainHeader() {
  return (
    <header className={classes.header}>
      <Link className={classes.logo} href="/">
        <Image src={logoImg} alt="A plate with food on it" priority />
        NextLevel Food
      </Link>

      <nav className={classes.nav}>
        <ul>
          <li>
            <Link href="/meals">Meals</Link>
          </li>
          <li>
            <Link href="/community">Community</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
```

`priority`는 콘솔창에 들어가보면 경고가 띄어져 있어서 추가

## 리액트 서버 컴포넌트 vs 클라이언트 컴포넌트

컴포넌트에서 `useState`를 사용하니 에러가 발생하였다.

```bash
./components\images\image-slideshow.js
ReactServerComponentsError:

You're importing a component that needs useState. It only works in a Client Component but none of its parents are marked with "use client", so they're Server Components by default.
Learn more: https://nextjs.org/docs/getting-started/react-essentials

   ╭─[...\StudyReact\25-nextjs\practice-next-app\components\images\image-slideshow.js:1:1]
 1 │ import { useEffect, useState } from "react";
   ·                     ────────
 2 │ import Image from "next/image";
 3 │
 3 │ import burgerImg from "@/assets/burger.jpg";
   ╰────

Maybe one of these should be marked as a client entry with "use client":
  ./components\images\image-slideshow.js
  ./app\page.js
```

Next.js의 경우에는 FE와 BE가 있다. NextJS는 SSR(Server Side Rendering)이다.

`console.log()`라고 하면 브라우저 console창에 나오지 않는다. -> 서버에서 실행되기 때문에 터미널에 출력된다.

Next.js에서는 서버에서 실행되기에 Client에서 실행되려면 `use client` 지시어를 사용해주어야 한다.

```js
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import burgerImg from "@/assets/burger.jpg";
import curryImg from "@/assets/curry.jpg";
import dumplingsImg from "@/assets/dumplings.jpg";
import macncheeseImg from "@/assets/macncheese.jpg";
import pizzaImg from "@/assets/pizza.jpg";
import schnitzelImg from "@/assets/schnitzel.jpg";
import tomatoSaladImg from "@/assets/tomato-salad.jpg";
import classes from "./image-slideshow.module.css";

const images = [
  { image: burgerImg, alt: "A delicious, juicy burger" },
  { image: curryImg, alt: "A delicious, spicy curry" },
  { image: dumplingsImg, alt: "Steamed dumplings" },
  { image: macncheeseImg, alt: "Mac and cheese" },
  { image: pizzaImg, alt: "A delicious pizza" },
  { image: schnitzelImg, alt: "A delicious schnitzel" },
  { image: tomatoSaladImg, alt: "A delicious tomato salad" },
];

export default function ImageSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.slideshow}>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.image}
          className={index === currentImageIndex ? classes.active : ""}
          alt={image.alt}
        />
      ))}
    </div>
  );
}
```

use client를 쓰는 부분은 최소 단위로 쓰는 것이 좋다.

즉, header에서 `nav`를 통하여 내가 위치한 부분을 `active`하고 싶다고 하자.

그러면 Next.js에서는 usePathname이라는 훅을 사용해야 하는데 이는 또 `use client`가 필요하다. `main-header.js`파일에 바로 진행하기에는 다른 요소들 까지도 client에서 처리되어야 하니 이 부분만 따로 진행되게 컴포넌트화 해준다.

```js
// nav-link.js
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import classes from "./nav-link.module.css";

export default function NavLink({ href, children }) {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={
        path.startsWith(href)
          ? `${classes.link} ${classes.active}`
          : classes.link
      }
    >
      {children}
    </Link>
  );
}
```

```js
// main-header.js
import Link from "next/link";
import Image from "next/image";

import logoImg from "@/assets/logo.png";
import classes from "./main-header.module.css";
import MainHeaderBackground from "./main-header-background";
import NavLink from "./nav-link";

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={logoImg} alt="A plate with food on it" priority />
          NextLevel Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
```

## SQLite 데이터베이스 설정

```bash
npm install better-sqlite3
```

프로젝트를 위해서 작성된 파일을 제공받았음.

```js
// initdb.js
const sql = require("better-sqlite3");
const db = sql("meals.db");

const dummyMeals = [
  {
    title: "Juicy Cheese Burger",
    slug: "juicy-cheese-burger",
    image: "/images/burger.jpg",
    summary:
      "A mouth-watering burger with a juicy beef patty and melted cheese, served in a soft bun.",
    instructions: `
      1. Prepare the patty:
         Mix 200g of ground beef with salt and pepper. Form into a patty.

      2. Cook the patty:
         Heat a pan with a bit of oil. Cook the patty for 2-3 minutes each side, until browned.

      3. Assemble the burger:
         Toast the burger bun halves. Place lettuce and tomato on the bottom half. Add the cooked patty and top with a slice of cheese.

      4. Serve:
         Complete the assembly with the top bun and serve hot.
    `,
    creator: "John Doe",
    creator_email: "johndoe@example.com",
  },
  {
    title: "Spicy Curry",
    slug: "spicy-curry",
    image: "/images/curry.jpg",
    summary:
      "A rich and spicy curry, infused with exotic spices and creamy coconut milk.",
    instructions: `
      1. Chop vegetables:
         Cut your choice of vegetables into bite-sized pieces.

      2. Sauté vegetables:
         In a pan with oil, sauté the vegetables until they start to soften.

      3. Add curry paste:
         Stir in 2 tablespoons of curry paste and cook for another minute.

      4. Simmer with coconut milk:
         Pour in 500ml of coconut milk and bring to a simmer. Let it cook for about 15 minutes.

      5. Serve:
         Enjoy this creamy curry with rice or bread.
    `,
    creator: "Max Schwarz",
    creator_email: "max@example.com",
  },
  {
    title: "Homemade Dumplings",
    slug: "homemade-dumplings",
    image: "/images/dumplings.jpg",
    summary:
      "Tender dumplings filled with savory meat and vegetables, steamed to perfection.",
    instructions: `
      1. Prepare the filling:
         Mix minced meat, shredded vegetables, and spices.

      2. Fill the dumplings:
         Place a spoonful of filling in the center of each dumpling wrapper. Wet the edges and fold to seal.

      3. Steam the dumplings:
         Arrange dumplings in a steamer. Steam for about 10 minutes.

      4. Serve:
         Enjoy these dumplings hot, with a dipping sauce of your choice.
    `,
    creator: "Emily Chen",
    creator_email: "emilychen@example.com",
  },
  {
    title: "Classic Mac n Cheese",
    slug: "classic-mac-n-cheese",
    image: "/images/macncheese.jpg",
    summary:
      "Creamy and cheesy macaroni, a comforting classic that's always a crowd-pleaser.",
    instructions: `
      1. Cook the macaroni:
         Boil macaroni according to package instructions until al dente.

      2. Prepare cheese sauce:
         In a saucepan, melt butter, add flour, and gradually whisk in milk until thickened. Stir in grated cheese until melted.

      3. Combine:
         Mix the cheese sauce with the drained macaroni.

      4. Bake:
         Transfer to a baking dish, top with breadcrumbs, and bake until golden.

      5. Serve:
         Serve hot, garnished with parsley if desired.
    `,
    creator: "Laura Smith",
    creator_email: "laurasmith@example.com",
  },
  {
    title: "Authentic Pizza",
    slug: "authentic-pizza",
    image: "/images/pizza.jpg",
    summary:
      "Hand-tossed pizza with a tangy tomato sauce, fresh toppings, and melted cheese.",
    instructions: `
      1. Prepare the dough:
         Knead pizza dough and let it rise until doubled in size.

      2. Shape and add toppings:
         Roll out the dough, spread tomato sauce, and add your favorite toppings and cheese.

      3. Bake the pizza:
         Bake in a preheated oven at 220°C for about 15-20 minutes.

      4. Serve:
         Slice hot and enjoy with a sprinkle of basil leaves.
    `,
    creator: "Mario Rossi",
    creator_email: "mariorossi@example.com",
  },
  {
    title: "Wiener Schnitzel",
    slug: "wiener-schnitzel",
    image: "/images/schnitzel.jpg",
    summary:
      "Crispy, golden-brown breaded veal cutlet, a classic Austrian dish.",
    instructions: `
      1. Prepare the veal:
         Pound veal cutlets to an even thickness.

      2. Bread the veal:
         Coat each cutlet in flour, dip in beaten eggs, and then in breadcrumbs.

      3. Fry the schnitzel:
      Heat oil in a pan and fry each schnitzel until golden brown on both sides.

      4. Serve:
      Serve hot with a slice of lemon and a side of potato salad or greens.
 `,
    creator: "Franz Huber",
    creator_email: "franzhuber@example.com",
  },
  {
    title: "Fresh Tomato Salad",
    slug: "fresh-tomato-salad",
    image: "/images/tomato-salad.jpg",
    summary:
      "A light and refreshing salad with ripe tomatoes, fresh basil, and a tangy vinaigrette.",
    instructions: `
      1. Prepare the tomatoes:
        Slice fresh tomatoes and arrange them on a plate.
    
      2. Add herbs and seasoning:
         Sprinkle chopped basil, salt, and pepper over the tomatoes.
    
      3. Dress the salad:
         Drizzle with olive oil and balsamic vinegar.
    
      4. Serve:
         Enjoy this simple, flavorful salad as a side dish or light meal.
    `,
    creator: "Sophia Green",
    creator_email: "sophiagreen@example.com",
  },
];

db.prepare(
  `
   CREATE TABLE IF NOT EXISTS meals (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       slug TEXT NOT NULL UNIQUE,
       title TEXT NOT NULL,
       image TEXT NOT NULL,
       summary TEXT NOT NULL,
       instructions TEXT NOT NULL,
       creator TEXT NOT NULL,
       creator_email TEXT NOT NULL
    )
`
).run();

async function initData() {
  const stmt = db.prepare(`
      INSERT INTO meals VALUES (
         null,
         @slug,
         @title,
         @image,
         @summary,
         @instructions,
         @creator,
         @creator_email
      )
   `);

  for (const meal of dummyMeals) {
    stmt.run(meal);
  }
}

initData();
```

```bash
node initdb.js
```

서버 사이드 랜더링이기에 컴포넌트 정의 앞에 `async`를 사용할 수 있다.

`export default async function Meals()`

데이터를 한번 불러오고 나서 새로고침이 될 때 2초 후에 meals화면이 리랜더링되는데 데이터를 다시 적용하기 때문이다.

db 불러오는 부분에서 setTimeout으로 2초를 잡아두고 있기 때문... 이것이 중요한 것이 아니라 캐싱이 된다는 사실이다. Nextjs에서 기본적으로 캐싱을 지원해준다는 점이다. 그래서 다른 라우트를 들렸다가 돌아오면 변화없이 보여진다.

## Suspense & Streamed Response를 이용한 세분화 코딩 상태 관리

loading.js를 이용하면 해당 라우트 로딩 상태일 때 해당 부분이 대체하게 된다.

그런데 원하는건 부분적으로 적용하고 싶다. (물론 지금도 main-header부분은 따로 작동하긴 하지만... 내부 요소에서 부분적 적용)

loading을 사용하지 않고 Suspense를 이용하면 된다.

```js
import Link from "next/link";
import { Suspense } from "react";

import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";

async function Meals() {
  const meals = await getMeals();

  return <MealsGrid meals={meals} />;
}

export default async function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>Fetching meals...</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
```

## 오류 처리 방법

오류는 Client 컴포넌트로 봐야 한다.

```js
// error.js
"use client";

export default function Error() {
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>Failed to fetch meal data. Please try again layer.</p>
    </main>
  );
}
```

## Not Found Page 처리

- not-found.js를 통해서 처리

## 동적 경로와 경로 매개변수를 활용한 Meals 세부내용 로딩 및 렌더링

HTML코드로 출력되어야 하는 부분에 대해서 그냥 사용하면 XSS(크로스 사이트 스크립트) 공격 위험이 있다.

그래서 다음과 같이 `dangerouslySetInnerHTML`로 처리한다.

```js
<p
  className={classes.instructions}
  dangerouslySetInnerHTML={{
    __html: meal.instructions,
  }}
></p>
```

## 양식 제출 처리를 위한 서버 액션 소개 및 사용 방법

`use server`

함수 안에다가 사용하게 되면 Server Action이라는 것을 생성하게 된다. 오직 서버에서만 실행되게 보장해주는 기능이다.

함수 앞에 `async`를 붙여 주어야 한다.

Server Action은 리액트에서도 존재하지만 서버 컴포넌트와 같이 바닐라 리액트 앱에서는 제대로 작동하지 않는다.

form에 action의 속성에 값으로 할당할 수 있다.

또한, `use client`를 사용하면서 `use server`를 사용할순 없다. 2개를 동시에 써야하는 상황에서는 컴포넌트화 하여 진행하면 된다.

```js
// lib/actions.js
"use server";

export async function shareMeal(formData) {
  "use server";

  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  console.log(meal);
}
```

여기서는 해당 부분만 따로 빼서 함수를 import 하였다.

## XSS 보호를 위한 슬러그 생성 및 유저 입력 무결 처리하기

```bash
npm install slugify xss
```

- xss: xss(크로스 사이드 스크립트)를 방어하기 위한 라이브러리
- slugify: 텍스트를 slug로 변환해주는 라이브러리

```js
// meals/share/page.js
"use client";

import ImagePicker from "@/components/meals/image-picker";

import { shareMeal } from "@/lib/actions";
import classes from "./page.module.css";
import MealsFormSubmit from "@/components/meals/meals-form-submit";

export default function ShareMealPage() {
  const [state, formAction] = useFormState(shareMeal, { message: null });

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker label="Your image" name="image" />
          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
```

```js
// lib/meals.js
import fs from "node:fs";

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // 학습을 위한 지연

  // throw new Error("Loading meals failed"); // 학습을 위한 에러
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(
    `
    INSERT INTO meals
      (slug, title, image, summary, instructions, creator, creator_email)
    VALUES(
      @slug,
      @title,
      @image,
      @summary,
      @instructions,
      @creator,
      @creator_email
    )
  `
  ).run(meal);
}
```

`@`로 처리하는 방식이 sqlite3에서만 지원하는 방식인지 이후 확인은 필요할듯

```js
// lib/actions.js
"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

function isInvalidText(text) {
  return !text || text.trim() === "";
}

// useFormState에서 사용하는 함수가 되면서
// 1번째 인자: 이전 상태값이 되면서 안쓰더라도 formData를 쓰기 위해 파라미터로 작성해야함
export async function shareMeal(prevState, formData) {
  "use server";

  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid input.",
    };
  }

  await saveMeal(meal);
  redirect("/meals");
}
```

> **🤔TODO: 여기까지 궁금한 점**
>
> - {} 쓰는 것이 아니라 안 쓰는 경우는 왜?
>
> ```js
> <p
>   className={classes.instructions}
>   dangerouslySetInnerHTML={{
>     __html: meal.instructions,
>   }}
> ></p>
> ```
>
> - useFormStatus는 무엇인가?
>
> ```js
> import { useFormStatus } from "react-dom";
> ```
>
> - useFormState는 무엇인가?
>
> ```js
> import { useFormState } from "react-dom";
> ```

## NextJS 캐싱 구축 및 이해

```bash
npm run build
npm start
```

배포 버전으로 시작했을 때 더 빠르긴하나 다른 부분들이 생겼다.

- 게시글 생성시 적용이 안된다.
- 새로고침 시 데이터가 바로 나온다 -> 2초 지연이 있는데?!

NextJS의 공격적인 캐싱으로 인하여 발생한다. 게시글 생성된 부분은 다시 build를 하고 켜게 되면 보인다. 그러나 당연스럽게 이러한 동작을 원하는 것은 아니다.

`revalidatePath(라우트, 페이지)`함수는 NextJS가 특정 path에 속하는 캐시의 유효성 재검사(revalidate)를 하게 한다.

- 페이지: 'page'(default), layout

```js
// lib/actions.js
export async function shareMeal(prevState, formData) {
  "use server";

  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid input.",
    };
  }

  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
}
```

여기 `revalidatePath`에서는 share페이지는 음식 데이터를 사용하지 않아서 두번째 인자를 사용할 필요 없다.

만약 웹 사이트의 모든 페이지를 재검사하고 싶다면 `revalidatePath('/', 'layout')`으로 설정하면 된다.

## 로컬 Filesystem에 파일 저장 금지!

`revalidatePath`를 사용하면 적용은 잘 되지만 이미지가 뜨지 않는다.

이미지가 public폴더에 들어가게 되면 배포 환경에서는 public폴더에 관여하지 않기 때문에 무시된다.

**AWS S3와 같은 파일 저장 서비스를 이용**하라고 NextJS 공식 문서에서 권장하고 있다.

https://aws.amazon.com/ko/s3/pricing/

⚠️AWS 관련해서는 과금이 될수도 있기에 주의!

🤔TODO: S3 연동 해볼 것

## 정적 메타데이터 & 동적 메타데이터 추가

https://nextjs.org/docs/app/building-your-application/optimizing/metadata#static-metadata

정적 메타데이터는 `metadata`를 이용하면 되지만, 동적 메타데이터는 `generateMetadata`라는 async함수를 이용한다.

Nextjs가 해당 함수 값을 찾아서 진행하기에 이름은 `generateMetadata`로 동일하게 해주어야 한다.

```js
// meals/[slug]/page.js
export async function generateMetadata({ params }) {
  const meal = getMeal(params.slug);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}
```
