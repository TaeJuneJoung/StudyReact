import Link from "next/link";
import { Fragment } from "react";

function NewPage() {
  return (
    <Fragment>
      <h1>The New Page</h1>
      <ul>
        <li>
          <Link href="/news/nextjs-is-a-great-framework">
            NextJS is a Great Framework
          </Link>
        </li>
        <li>
          <Link href="/news/something-else">Something Else</Link>
        </li>
      </ul>
    </Fragment>
  );
}

export default NewPage;
