import { useMemo } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import en from "../constants/locales/en/cookies";
import es from "../constants/locales/es/cookies";
import ca from "../constants/locales/ca/cookies";

import styles from "../styles/cookies.module.scss";

export default function Cookies() {
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
    <Layout title="Cookies">
      <main className={styles.main}>
        {Object.entries(language).map(
          ([key, value]) => (value.substring(0, 4) === "http" ? <a href={value} key={key}>{value}</a> : <p key={key}>{value}</p>)
        )}
      </main>
    </Layout>
  );
}
