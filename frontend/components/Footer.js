import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/footer.module.scss";
import en from "../languages/en/footer";
import es from "../languages/es/footer";
import ca from "../languages/ca/footer";

export default function Footer() {
  const [language, setLanguage] = useState(en);
  const { locale } = useRouter();
  useEffect(() => {
    switch (locale) {
      case "ca":
        setLanguage(ca);
        break;
      case "es":
        setLanguage(es);
        break;
      default:
        setLanguage(en);
        break;
    }
  }, [locale]);
  return (
    <footer className={styles.footer}>
      <p>{language.rigths}</p>
      <nav>
        <Link href="/cookies">{language.cookies}</Link>
        <Link href="/terms">{language.data}</Link>
      </nav>
    </footer>
  );
}
