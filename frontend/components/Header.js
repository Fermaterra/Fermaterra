import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Link href="/">Home</Link>
      <Link href="/booking">Booking</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/faq">Faq</Link>
    </header>
  );
}
