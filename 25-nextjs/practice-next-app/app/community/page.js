import Link from "next/link";

export default function Community() {
  return (
    <main>
      <h1>Community</h1>
      <p>
        <Link href="/meals">Meals</Link>
      </p>
      <p>
        <Link href="/meals/share">Share</Link>
      </p>
    </main>
  );
}
