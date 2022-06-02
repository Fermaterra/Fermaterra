import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import en from "../languages/en/cookies";
import es from "../languages/es/cookies";
import ca from "../languages/ca/cookies";

import styles from "../styles/cookies.module.scss";

export default function Cookies() {
  const { locale } = useRouter();
  const [language, setLanguage] = useState(en);
  useEffect(() => {
    switch (locale) {
      case "en":
        setLanguage(en);
        break;
      case "es":
        setLanguage(es);
        break;
      case "ca":
        setLanguage(ca);
        break;
      default:
        break;
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
