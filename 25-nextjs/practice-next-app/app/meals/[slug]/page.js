import Link from "next/link";

export default function MealsDetail({ params }) {
  return (
    <main>
      <h1>MealsDetail</h1>
      <p>{params.slug}</p>
      <p>
        <Link href="/meals">Meals</Link>
      </p>
      <p>
        <Link href="/meals/share">Share</Link>
      </p>
    </main>
  );
}
