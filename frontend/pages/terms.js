import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ca from "../languages/ca/terms";
import es from "../languages/es/terms";
import en from "../languages/en/terms";
import styles from "../styles/cookies.module.scss";

export default function Blog() {
  const [language, setLanguage] = useState(ca);
  const [title, setTitle] = useState("Política de Privadesa");
  const { locale } = useRouter();
  useEffect(() => {
    switch (locale) {
      case "ca":
        setLanguage(ca);
        setTitle("Política de Privadesa");
        break;
      case "es":
        setLanguage(es);
        setTitle("Política de Privacidad");
        break;
      case "en":
        setLanguage(en);
        setTitle("Privacy Policy");
        break;

      default:
        break;
    }
  }, [locale]);

  return (
    <Layout title={title}>
      <main className={styles.main}>
        <h1>{title}</h1>
        {Object.entries(language).map(
          ([key, value]) => (value.substring(0, 4) === "subt" ? <h2 href={value} key={key}>{value}</h2> : <p key={key}>{value}</p>)
        )}
      </main>
    </Layout>
  );
}
