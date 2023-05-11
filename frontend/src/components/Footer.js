import Link from "next/link";
import { useMemo } from "react";
import { useRouter } from "next/router";
import styles from "../styles/footer.module.scss";
import en from "../constants/locales/en/footer";
import es from "../constants/locales/es/footer";
import ca from "../constants/locales/ca/footer";

export default function Footer() {
  const { locale } = useRouter();
  const language = useMemo(() => {
    switch (locale) {
      case "es":
        return es;

      case "en":
        return en;

      case "ca":
        return ca;

      default:
        return en;
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
