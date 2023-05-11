import { useRouter } from "next/router";
import { useMemo } from "react";
import Layout from "../components/Layout";
import ca from "../constants/locales/ca/terms";
import es from "../constants/locales/es/terms";
import en from "../constants/locales/en/terms";
import styles from "../styles/cookies.module.scss";

export default function Blog() {
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
    <Layout title={language.title}>
      <main className={styles.main}>
        <h1>{language.title}</h1>
        {Object.entries(language).splice(1).map(
          ([key, value]) => (key.substring(0, 4) === "subt" ? <h2 href={value} key={key}>{value}</h2> : <p key={key}>{value}</p>)
        )}
      </main>
    </Layout>
  );
}
