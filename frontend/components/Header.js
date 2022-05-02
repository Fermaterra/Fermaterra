import Link from "next/link";
import styles from "../styles/header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div>
        <Link href="/">
          <div className={styles.logo}>
            <div className={styles.logo__container}>
              <h1>
                TERRAFERMA
                {" "}
              </h1>
              <span>Barcelona  -  Menorca</span>
            </div>

          </div>
        </Link>

      </div>
      <nav className={styles.nav}>
        <Link href="/booking">Reserves</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/faq">Faq</Link>
      </nav>

    </header>
  );
}
