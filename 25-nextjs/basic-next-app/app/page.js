import Link from "next/link";
import Header from "@/component/Header";

export default function Home() {
  return (
    <main>
      <Header />
      <p>🔥 Let&apos;s get started! 🔥</p>
      <p>
        <Link href="/about">About Us</Link>
      </p>
      <p>
        <Link href="/blog">Blog</Link>
      </p>
    </main>
  );
}
