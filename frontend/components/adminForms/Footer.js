import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <p>Tots els drets reservats</p>
      <nav>
        <Link href="/">Política de cookies</Link>
        <Link href="/">Política de privacitat</Link>
        <Link href="/">Protecció de dades</Link>
        <Link href="/">Ús de galetes</Link>
      </nav>
    </footer>
  );
}
