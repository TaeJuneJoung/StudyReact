import Link from "next/link";

export default function Meals() {
  return (
    <main>
      <h1>Meals</h1>
      <p>
        <Link href="/meals/share">Share</Link>
      </p>
      <p>
        <Link href="/meals/1">Meals 1</Link>
      </p>
      <p>
        <Link href="/meals/2">Meals 2</Link>
      </p>
    </main>
  );
}
